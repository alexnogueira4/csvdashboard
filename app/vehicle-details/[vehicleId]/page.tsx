import React from 'react'
import { getVehicleDetails } from '@/app/lib/data'
import VehicleDetail from '@/app/ui/components/details/vehicle-detail'

const Page: React.FC<{ params: { vehicleId: string } }> = async ({
  params,
}) => {
  const vehicleId = (await params).vehicleId

  const details = await getVehicleDetails(vehicleId)

  return (
    <div className="vehicle-details" data-testid="vehicle-details">
      <h1 className="text-5xl font-semibold text-black-500">{vehicleId}</h1>
      <VehicleDetail details={details} />
    </div>
  )
}

export default Page
