import { SortDescriptor } from '@nextui-org/react'

export type Vehicle = {
  license_number?: string
  license_state?: string
  unit_type?: string
  unit: string
  vehicle_id_number?: string
}

export type Violation = {
  basic: string
  code: string
  convicted_of_dif_charge: string
  description: string
  oos: string
  time_severity_weight: string
  unit: string
}

export type Inspection = {
  _id: string
  hm_inspection: string
  inspection_date: string
  level: string
  placarable_hm_veh_insp: string
  report_number: string
  report_state: string
  time_weight: string
  vehicles?: Vehicle[]
  violations?: Violation[]
}

export type SearchOptions = {
  limit?: number
  page?: number
  search?: string
  sortBy?: string
  sortOrder?: 'ascending' | 'descending'
}

export type TableColumns = {
  name: string
  uid: string
  sortable?: boolean
}

export type TableData = any

export type TableProps = {
  rowKey: keyof TableData
  data: TableData[]
  headerColumns: TableColumns[]
  sortDescriptor?: SortDescriptor
  bottomContent?: React.ReactElement
  topContent?: React.ReactElement
  isHoverable?: boolean
  onSortChange?: (value: SortDescriptor) => void
  onRowClick?: (value: TableData) => any
  renderCell?: (value: any, columnKey: React.Key) => any
}

export type InspectionsApiResult = {
  message?: string
  error?: unknown | string
  results?: Inspection[]
  totalCount?: number
}

export type FlatInspection = Omit<Inspection, 'vehicles' | 'violations'>
