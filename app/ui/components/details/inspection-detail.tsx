'use client'

import React from 'react'
import { Input, Spacer } from '@nextui-org/react'
import { Inspection } from '@/app/lib/definitions'
import InspectionDetailCard from './detail-card'

interface InspectionDetailProps {
  inspection: Inspection
}

const InspectionDetail: React.FC<InspectionDetailProps> = ({ inspection }) => {
  return (
    <>
      <InspectionDetailCard title="Inspection Overview">
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            isDisabled
            label="inspection_date"
            defaultValue={inspection.inspection_date}
          />
          <Input
            isDisabled
            label="report_number"
            defaultValue={inspection.report_number}
          />
        </div>
        <Spacer y={4} />
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            isDisabled
            label="placarable_hm_veh_insp"
            defaultValue={inspection.placarable_hm_veh_insp}
          />
          <Input
            isDisabled
            label="hm_inspection"
            defaultValue={inspection.hm_inspection}
          />
        </div>
        <Spacer y={4} />
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input isDisabled label="level" defaultValue={inspection.level} />
          <Input
            isDisabled
            label="report_state"
            defaultValue={inspection.report_state}
          />
          <Input
            isDisabled
            label="time_weight"
            defaultValue={inspection.time_weight}
          />
        </div>
      </InspectionDetailCard>
    </>
  )
}

export default InspectionDetail
