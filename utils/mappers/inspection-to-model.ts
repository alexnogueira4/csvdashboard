import { Inspection } from '@/app/lib/definitions'
import mapVehicle from './vehicle-to-model'
import mapViolation from './violation-to-model'

export default function mapInspection(doc: any): Omit<Inspection, '_id'> {
  const vehiclesMapped = doc.vehicles && doc.vehicles.flatMap(mapVehicle)
  const violationsMapped =
    doc.violations && doc.violations.flatMap(mapViolation)
  return {
    hm_inspection: doc.$.HM_inspection,
    inspection_date: doc.$.inspection_date,
    level: doc.$.level,
    placarable_hm_veh_insp: doc.$.Placarable_HM_Veh_Insp,
    report_number: doc.$.report_number,
    report_state: doc.$.report_state,
    time_weight: doc.$.time_weight,
    vehicles: vehiclesMapped,
    violations: violationsMapped,
  }
}
