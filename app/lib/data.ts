import { Inspection, InspectionsApiResult, SearchOptions } from './definitions'

export async function postInspectionData(inspectionList: Inspection[]) {
  await fetch('/api/inspections', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inspectionList),
  })
}

export async function getInspectionData({
  page = 1,
  limit = 100,
  search = '',
  sortBy = 'inspection_date',
  sortOrder = 'ascending',
}: SearchOptions): Promise<InspectionsApiResult> {
  const url = new URL('/api/inspections', 'http://localhost:3000')
  url.searchParams.append('page', String(page))
  url.searchParams.append('limit', String(limit))
  if (search) {
    url.searchParams.append('search', search)
  }
  url.searchParams.append('sortBy', sortBy)
  url.searchParams.append('sortOrder', sortOrder)

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch inspection data')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error retrieving inspection data:', error)
    return { results: [], totalCount: 0 }
  }
}

export async function getInspectionByReportNumber(
  reportNumber: string
): Promise<Inspection> {
  const url = new URL(
    `/api/inspections/${reportNumber}`,
    'http://localhost:3000'
  )

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch inspection data')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error retrieving inspection data:', error)
    return { nope: true } as unknown as Inspection
  }
}

export async function getVehicleDetails(
  reportNumber: string
): Promise<Inspection> {
  const url = new URL(
    `/api/vehicles/DecodeVinValues/${reportNumber}`,
    'https://vpic.nhtsa.dot.gov'
  )
  url.searchParams.append('format', 'json')

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch inspection data')
    }

    const { Results } = await response.json()
    return Results[0]
  } catch (error) {
    console.error('Error retrieving vehicle details:', error)
    return { nope: true } as unknown as Inspection
  }
}
