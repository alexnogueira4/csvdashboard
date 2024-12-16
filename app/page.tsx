'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { getInspectionData } from '@/app/lib/data'
import CustomTable from '@/app/ui/components/custom-table'
import { Inspection, TableColumns, Violation } from '@/app/lib/definitions'
import { InspectionsSkeleton } from '@/app/ui/components/skeletons'
import { Button, Input, Pagination, SortDescriptor } from '@nextui-org/react'
import { SearchIcon } from './ui/icons/search-icon'
import UploadXmlComponent from '@/app/ui/components/details/upload-xml'
import { useRouter } from 'next/navigation'
import { formatDateToLocal } from './lib/utils'

export default function Page() {
  const router = useRouter()
  const [data, setData] = useState<Inspection[]>([])
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'inspection_date',
    direction: 'ascending',
  })
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [newUpload, setNewUpload] = useState(false)
  const [searchValue, setSearchValue] = React.useState('')
  const [delayedSearchValue, setDelayedSearchValue] = useState<string>('')
  const pages = Math.ceil(totalCount / rowsPerPage)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { results = [], totalCount = 0 } = await getInspectionData({
        page,
        limit: rowsPerPage,
        sortBy: sortDescriptor.column,
        sortOrder: sortDescriptor.direction,
        search: delayedSearchValue,
      })
      setData(results)
      setTotalCount(totalCount)
      setLoading(false)
    }

    fetchData()
  }, [page, rowsPerPage, sortDescriptor, delayedSearchValue, newUpload])

  const columns: TableColumns[] = [
    { name: 'Inspection Date', uid: 'inspection_date', sortable: true },
    { name: 'BASIC', uid: 'basic' },
    { name: 'HM Inspection', uid: 'hm_inspection', sortable: true },
    { name: 'Level', uid: 'level', sortable: true },
    { name: 'Placarable HM', uid: 'placarable_hm_veh_insp', sortable: true },
    { name: 'Report Number', uid: 'report_number', sortable: true },
    { name: 'Report State', uid: 'report_state', sortable: true },
    { name: 'Time Weight', uid: 'time_weight', sortable: true },
    { name: 'Vehicles', uid: 'vehicles' },
    { name: 'Violations', uid: 'violations' },
  ]

  const handleOnClearSearch = React.useCallback(() => {
    setSearchValue('')
    setPage(1)
  }, [])

  const handleOnRowClick = React.useCallback(
    (item: any) => {
      router.push(`/details/${item.report_number}`)
    },
    [router]
  )

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setSearchValue(value.trim())
    } else {
      setSearchValue('')
    }
  }, [])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDelayedSearchValue(searchValue)
    }, 700)

    return () => {
      clearTimeout(handler)
    }
  }, [searchValue])

  const renderCell = React.useCallback(
    (inspection: any, columnKey: React.Key) => {
      let cellValue
      if (columnKey === 'basic') {
        cellValue = inspection?.violations
          ?.map((violation: Violation) => violation.basic)
          .join(', ')
      } else {
        cellValue = inspection[columnKey as keyof Inspection | 'actions']
      }

      switch (columnKey) {
        case 'inspection_date':
          return formatDateToLocal(cellValue)
        case 'vehicles':
          return cellValue.length
        case 'violations':
          return cellValue.length
        default:
          return cellValue
      }
    },
    []
  )

  const topContent = React.useMemo(() => {
    const handleRowsPerPageChange = (
      e: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setRowsPerPage(Number(e.target.value))
      setPage(1)
    }

    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by Date, Basic, Level, Placarable, Report Number, Report State or Time Weight"
            startContent={<SearchIcon />}
            value={searchValue}
            onClear={handleOnClearSearch}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <UploadXmlComponent
              callback={() => {
                setNewUpload(true)
              }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {totalCount} inspections
          </span>
          <label className="flex items-center text-default-400 text-small">
            Inspections per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value="5">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
        </div>
      </div>
    )
  }, [
    searchValue,
    onSearchChange,
    handleOnClearSearch,
    rowsPerPage,
    totalCount,
  ])

  const bottomContent = React.useMemo(() => {
    const handleNextPage = () => {
      if (page < Math.ceil(totalCount / rowsPerPage)) {
        setPage(page + 1)
      }
    }

    const handlePreviousPage = () => {
      if (page > 1) {
        setPage(page - 1)
      }
    }

    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={handlePreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={handleNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    )
  }, [page, pages, rowsPerPage, totalCount])

  return (
    <div data-test-id="main-page">
      {loading ? (
        <InspectionsSkeleton />
      ) : (
        <CustomTable
          data={data}
          rowKey="_id"
          headerColumns={columns}
          onSortChange={setSortDescriptor}
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          bottomContent={bottomContent}
          onRowClick={handleOnRowClick}
          renderCell={renderCell}
        />
      )}
    </div>
  )
}
