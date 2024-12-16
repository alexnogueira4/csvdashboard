'use client'

import { useState } from 'react'
import Loader from './loader'
import { Button } from '@nextui-org/button'
import { Input, Spinner } from '@nextui-org/react'

export default function Page({ callback }: { callback?: () => void }) {
  const [loading, setLoading] = useState(false)

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files && !event?.target?.files?.[0]) {
      return
    }
    const file = event.target.files[0]
    if (file) {
      setLoading(true)
      try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/inspections', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Error uploading file')
        }

        if (callback && typeof callback === 'function') callback()
      } catch (error) {
        console.error('Error uploading file:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <div className="flex justify-between gap-3 items-end">
        <Input
          type="file"
          onChange={handleUpload}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="flex gap-3">
          <Button as="span" className="bg-[#d4f101]">
            {loading ? <Spinner size="sm" /> : 'Upload XML'}
          </Button>
        </label>
      </div>
      {loading && <Loader />}
    </>
  )
}
