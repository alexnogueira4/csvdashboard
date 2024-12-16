'use client'

import React from 'react'
import { Spacer } from '@nextui-org/react'

interface DetailCardProps {
  title: string
  children: React.ReactNode
}

const DetailCard: React.FC<DetailCardProps> = ({ title, children }) => {
  return (
    <>
      <h1 className="ms-2 font-semibold text-gray-500 dark:text-gray-400">
        {title}
      </h1>
      <Spacer y={3} />
      <div className="w-full flex flex-col">{children}</div>
    </>
  )
}

export default DetailCard
