'use client'

import React from 'react'
import { Input, Spacer, Card, CardBody } from '@nextui-org/react'
import DetailCard from '@/app/ui/components/details/detail-card'

interface VehicleDetailProps {
  details: any
}

const VehicleDetail: React.FC<VehicleDetailProps> = ({ details }) => {
  const entries = Object.entries(details).filter(
    ([, value]) => value && value !== null && value !== undefined
  )
  const inputGroups = []

  for (let i = 0; i < entries.length; i += 2) {
    const group = (
      <div key={`div-${i}`}>
        <div
          key={`group-${i}`}
          className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
        >
          <Input
            key={`input-${i}`}
            isDisabled
            label={entries[i][0]}
            defaultValue={entries[i][1] as string}
          />
          {entries[i + 1] && (
            <Input
              key={`input-${i + 1}`}
              isDisabled
              label={entries[i + 1][0]}
              defaultValue={entries[i + 1][1] as string}
            />
          )}
        </div>
        <Spacer key={`space-${i}`} y={4} />
      </div>
    )
    inputGroups.push(group)
  }

  return (
    <Card className="p-5 m-auto mt-5 shadow-none">
      <CardBody>
        <DetailCard title="Vehicle Details">{inputGroups}</DetailCard>
      </CardBody>
    </Card>
  )
}

export default VehicleDetail
