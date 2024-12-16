import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, Db } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import formidable from 'formidable'
import fs from 'fs'
import {
  Inspection,
  InspectionsApiResult,
  SearchOptions,
} from '@/app/lib/definitions'
import mapInspection from '@/utils/mappers/inspection-to-model'
import { converXmlToJson } from '@/utils/convert-xml-to-json'
import { IncomingForm } from 'formidable'

export const config = {
  api: {
    bodyParser: false,
  },
}

const dbName = process.env.DB_NAME!

async function createInspections(
  db: Db,
  newInspections: Inspection[]
): Promise<void> {
  try {
    const inspectionsMapped = newInspections.map(mapInspection)
    await db.collection('inspections').insertMany(inspectionsMapped)
  } catch (error) {
    console.error('Error inserting inspections:', error)
    throw error
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InspectionsApiResult>
) {
  const client: MongoClient = await clientPromise
  const db: Db = client.db(dbName)

  switch (req.method) {
    case 'GET':
      try {
        const { page, limit, search, sortBy, sortOrder } =
          req.query as unknown as SearchOptions
        const result = await getInspections(db, {
          page,
          limit,
          search,
          sortBy,
          sortOrder,
        })
        res.status(200).json(result)
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch inspections', error })
      }
      break
    case 'POST':
      const form = new IncomingForm({
        keepExtensions: true,
        maxFileSize: 30 * 1024 * 1024,
      })

      try {
        const [, files] = await form.parse(req)
        const file = files.file && (files.file[0] as formidable.File)
        if (!file) {
          return res.status(400).json({ error: 'No file uploaded' })
        }
        const xmlData = fs.readFileSync(file.filepath, 'utf-8')
        const jsonData = await converXmlToJson(xmlData)
        const carrierData = jsonData.carrierdata
        const inspectionList = carrierData?.inspections?.[0]?.inspection || []

        if (inspectionList.length) {
          await createInspections(db, inspectionList)
          res.status(201).json({ message: 'success' })
        } else {
          res.status(400).json({ error: 'No inspections found in the XML' })
        }
      } catch (error) {
        return res.status(400).json({ message: 'Error uploading file', error })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

async function getInspections(
  db: Db,
  {
    page = 1,
    limit = 100,
    search,
    sortBy = 'inspection_date',
    sortOrder = 'descending',
  }: SearchOptions
): Promise<InspectionsApiResult> {
  const filter: Record<string, any> = {}

  if (search) {
    const searchRegex = { $regex: search, $options: 'i' }
    filter.$or = [
      { inspection_date: searchRegex },
      { hm_inspection: searchRegex },
      { report_number: searchRegex },
      { report_state: searchRegex },
      { time_weight: searchRegex },
      {
        vehicles: {
          $elemMatch: {
            $or: [
              { license_number: searchRegex },
              { license_state: searchRegex },
              { license_number: searchRegex },
              { license_state: searchRegex },
              { unit_type: searchRegex },
              { unit: searchRegex },
              { vehicle_id_number: searchRegex },
            ],
          },
        },
      },
      {
        violations: {
          $elemMatch: {
            $or: [
              { basic: searchRegex },
              { code: searchRegex },
              { convicted_of_dif_charge: searchRegex },
              { description: searchRegex },
              { oos: searchRegex },
              { time_severity_weight: searchRegex },
              { unit: searchRegex },
            ],
          },
        },
      },
    ]
  }
  const sort: any = { [sortBy]: sortOrder === 'ascending' ? 1 : -1 }
  const skip = (page - 1) * limit

  const documents = await db
    .collection('inspections')
    .find(filter)
    .skip(skip)
    .limit(parseInt(`${limit}`))
    .sort(sort)
    .toArray()

  const totalCount = await db.collection('inspections').countDocuments(filter)
  console.log('COUNT', totalCount)

  return {
    results: documents as unknown as Inspection[],
    totalCount,
  }
}
