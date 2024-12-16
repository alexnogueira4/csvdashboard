import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, Db } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import { Inspection } from '@/app/lib/definitions'

const dbName = process.env.DB_NAME!

async function getInspectionByReportNumber(
  db: Db,
  report_number: string
): Promise<Inspection | null> {
  const inspection = await db
    .collection('inspections')
    .findOne({ report_number: report_number })

  return inspection as Inspection | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client: MongoClient = await clientPromise
  const db: Db = client.db(dbName)

  const { report_number } = req.query

  switch (req.method) {
    case 'GET':
      try {
        if (report_number) {
          const result = await getInspectionByReportNumber(
            db,
            report_number as string
          )
          if (result) {
            res.status(200).json(result)
          } else {
            res.status(404).json({ error: 'Inspection not found' })
          }
        } else {
          res.status(400).json({ error: 'Report number is required' })
        }
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch inspection', error })
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
