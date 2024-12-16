import { Spinner } from '@nextui-org/react'
import React from 'react'

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
      <Spinner />
    </div>
  )
}

export default Loader
