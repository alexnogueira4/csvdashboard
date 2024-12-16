import { Violation } from '@/app/lib/definitions'

export default function mapViolation(violation: any): Violation[] {
  return violation.violation.map(
    (v: any): Violation => ({
      basic: v.$.BASIC,
      code: v.$.code,
      convicted_of_dif_charge: v.$.convicted_of_dif_charge,
      description: v.$.description,
      oos: v.$.oos,
      time_severity_weight: v.$.time_severity_weight,
      unit: v.$.unit,
    })
  )
}
