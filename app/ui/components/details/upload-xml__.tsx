'use client'

import { useState } from 'react'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/react'
import Loader from './loader'

export default function Page({ callback }: { callback?: () => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
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
    <div>
      <div className="flex justify-between gap-3 items-end">
        <Input type="file" onChange={handleFileChange} />
        <div className="flex gap-3">
          <Button
            disabled={!file}
            className="bg-[#d4f101]"
            onClick={handleUpload}
          >
            Upload XML
          </Button>
        </div>
      </div>

      {loading && <Loader />}
    </div>
  )
}
