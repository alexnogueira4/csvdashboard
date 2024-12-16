'use client'
import React from 'react'
import InspectionDetail from '@/app/ui/components/details/inspection-detail'
import VehicleInformation from '@/app/ui/components/details/vehicle-information'
import ViolationInformation from '@/app/ui/components/details/violation-information'
import { Card, Spacer, CardBody } from '@nextui-org/react'
import { Inspection } from '@/app/lib/definitions'

interface InspectionOverviewProps {
  inspection: Inspection
}

const InspectionOverview: React.FC<InspectionOverviewProps> = ({
  inspection,
}) => {
  return (
    <>
      <h1 className="text-5xl font-semibold text-black-500">
        {inspection.report_number}
      </h1>
      <Card className="p-5 m-auto mt-5 shadow-none">
        <CardBody>
          <InspectionDetail inspection={inspection} />
          <Spacer y={4} />
          {inspection?.vehicles && (
            <VehicleInformation vehicles={inspection.vehicles} />
          )}
          <Spacer y={4} />
          {inspection?.violations && (
            <ViolationInformation violations={inspection.violations} />
          )}
        </CardBody>
      </Card>
    </>
  )
}

export default InspectionOverview
