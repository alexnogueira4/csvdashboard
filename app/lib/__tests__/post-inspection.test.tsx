import { postInspectionData } from '../data'
import { Inspection } from '../definitions'

global.fetch = jest.fn()

describe('API Functions', () => {
  it('should call fetch with correct parameters for postInspectionData', async () => {
    const mockInspectionList = [
      {
        _id: '',
        hm_inspection: 'string',
        inspection_date: 'string',
        level: 'string',
        placarable_hm_veh_insp: 'string',
        report_number: 'string',
        report_state: 'string',
        time_weight: 'string',
        vehicles: [],
        violations: [],
      },
    ] as Inspection[]

    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    })

    await postInspectionData(mockInspectionList)

    expect(fetch).toHaveBeenCalledWith(
      '/api/inspections',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockInspectionList),
      })
    )
  })
})
