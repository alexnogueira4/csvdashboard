import { getInspectionData } from '../data'

global.fetch = jest.fn()

describe('API Functions', () => {
  it('should fetch and return inspection data from getInspectionData', async () => {
    const mockResponse = {
      results: [
        {
          report_number: '12345',
          inspection_date: '2024-11-10',
          report_state: 'Completed',
          vehicles: [],
        },
      ],
      totalCount: 1,
    }

    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    })

    const data = await getInspectionData({
      page: 1,
      limit: 100,
      search: '12345',
      sortBy: 'inspection_date',
      sortOrder: 'ascending',
    })

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/inspections?page=1&limit=100&search=12345&sortBy=inspection_date&sortOrder=ascending',
      expect.objectContaining({
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
    )

    expect(data).toEqual(mockResponse)
  })
})
