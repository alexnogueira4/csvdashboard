import { TableColumns, Violation } from '@/app/lib/definitions'
import React from 'react'
import InspectionDetailCard from './detail-card'
import CustomTable from '../custom-table'

interface ViolationInformationProps {
  violations: Violation[]
}

const ViolationInformation: React.FC<ViolationInformationProps> = ({
  violations,
}) => {
  const columns: TableColumns[] = [
    { name: 'Unit', uid: 'unit' },
    { name: 'BASIC', uid: 'basic' },
    { name: 'Code', uid: 'code' },
    { name: 'Convicted Of Dif Charge', uid: 'convicted_of_dif_charge' },
    { name: 'Description', uid: 'description' },
    { name: 'OOS', uid: 'oos' },
    { name: 'Time Severity Weight', uid: 'time_severity_weight' },
  ]

  return (
    <>
      <InspectionDetailCard title="Violation Information">
        <CustomTable rowKey="code" data={violations} headerColumns={columns} />
      </InspectionDetailCard>
    </>
  )
}

export default ViolationInformation
