import { TableColumns, Vehicle } from '@/app/lib/definitions'
import React, { useCallback } from 'react'
import InspectionDetailCard from './detail-card'
import CustomTable from '../custom-table'
import { useRouter } from 'next/navigation'

interface VehicleInformationProps {
  vehicles: Vehicle[]
}

const VehicleInformation: React.FC<VehicleInformationProps> = ({
  vehicles,
}) => {
  const router = useRouter()

  const columns: TableColumns[] = [
    { name: 'Unit', uid: 'unit' },
    { name: 'Unit Type', uid: 'unit_type' },
    { name: 'License Number', uid: 'license_number' },
    { name: 'License State', uid: 'license_state' },
    { name: 'VIN', uid: 'vehicle_id_number' },
  ]

  const handleOnRowClick = useCallback(
    (item: any) => {
      router.push(`/vehicle-details/${item.vehicle_id_number}`)
    },
    [router]
  )

  return (
    <>
      <InspectionDetailCard title="Vehicle Information">
        <CustomTable
          rowKey="license_number"
          data={vehicles}
          headerColumns={columns}
          onRowClick={handleOnRowClick}
        />
      </InspectionDetailCard>
    </>
  )
}

export default VehicleInformation
