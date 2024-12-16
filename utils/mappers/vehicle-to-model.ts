import { Vehicle } from '@/app/lib/definitions'

export default function mapVehicle(vehicles: any): Vehicle[] {
  return vehicles.vehicle.map(
    (vehicleUnit: any): Vehicle => ({
      license_number: vehicleUnit.$.license_number,
      license_state: vehicleUnit.$.license_state,
      unit_type: vehicleUnit.$.unit_type,
      unit: vehicleUnit.$.unit,
      vehicle_id_number: vehicleUnit.$.vehicle_id_number,
    })
  )
}
