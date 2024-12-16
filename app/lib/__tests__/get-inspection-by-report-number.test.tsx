import { getInspectionByReportNumber } from '../data'

global.fetch = jest.fn()

describe('API Functions', () => {
  it('should fetch inspection data by report number from getInspectionByReportNumber', async () => {
    const mockInspection = {
      report_number: '12345',
      inspection_date: '2024-11-10',
      report_state: 'Completed',
      vehicles: [],
    }

    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockInspection,
    })

    const data = await getInspectionByReportNumber('12345')

    expect(fetch).toHaveBeenCalledWith(expect.anything(), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    expect(data).toEqual(mockInspection)
  })

  it('should return an empty object when getInspectionByReportNumber fetch fails', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    })

    const data = await getInspectionByReportNumber('12345')

    expect(data).toEqual({ nope: true })
  })
})
