import { getVehicleDetails } from '../data'

global.fetch = jest.fn()

describe('API Functions', () => {
  it('should fetch vehicle details by report number from getVehicleDetails', async () => {
    expect(1).toEqual(1)
    const mockVehicleDetails = {
      Results: [
        { make: 'Ford', model: 'F-150', year: 2020, vin: '3AKJGHDVXJSJJ2502' },
      ],
    }

    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockVehicleDetails,
    })

    const data = await getVehicleDetails('3AKJGHDVXJSJJ2502')

    expect(fetch).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
    )

    expect(data).toEqual(mockVehicleDetails.Results[0])
  })

  it('should return an empty object when getVehicleDetails fetch fails', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ Results: [] }),
    })

    const data = await getVehicleDetails('3AKJGHDVXJSJJ2502')

    expect(data).toEqual({ nope: true })
  })
})
