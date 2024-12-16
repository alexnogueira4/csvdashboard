'use server'
import React from 'react'
import InspectionOverview from '@/app/ui/components/details/inspection-overview'
import { getInspectionByReportNumber } from '@/app/lib/data'

const InspectionPage: React.FC<{ params: { detailId: string } }> = async ({
  params,
}) => {
  const detailId = (await params).detailId

  const inspectionData = await getInspectionByReportNumber(detailId)

  return (
    <div className="inspection-page" data-testid="inspection-page">
      <InspectionOverview inspection={inspectionData} />
    </div>
  )
}

export default InspectionPage
