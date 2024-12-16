'use client'

import React, { useCallback } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'
import { TableProps } from '@/app/lib/definitions'
import clsx from 'clsx'

const CustomTable: React.FC<TableProps> = ({
  data,
  headerColumns,
  sortDescriptor,
  topContent,
  bottomContent,
  rowKey,
  isHoverable = true,
  onSortChange,
  onRowClick,
  renderCell,
}) => {
  const handleRenderCell = useCallback((value: any, columnKey: React.Key) => {
    return value[columnKey as keyof typeof value]
  }, [])

  const cellRenderer = renderCell || handleRenderCell

  return (
    <Table
      aria-label="Custom table"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{ wrapper: 'max-h-[500px]' }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={onSortChange}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No inspections found'} items={data}>
        {(item) => (
          <TableRow
            key={item[rowKey] as React.Key}
            className={clsx({
              'hover:bg-gray-100': Boolean(isHoverable),
              'cursor-pointer': Boolean(onRowClick),
            })}
            onClick={() => onRowClick && onRowClick(item)}
          >
            {(columnKey) => (
              <TableCell>{cellRenderer(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default CustomTable
