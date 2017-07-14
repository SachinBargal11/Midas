import { SpecialityAdapter } from '../../../../account-setup/services/adapters/speciality-adapter';
import * as moment from 'moment';
import { PatientVisit } from '../../models/patient-visit';
import { RoomsAdapter } from '../../../../medical-provider/rooms/services/adapters/rooms-adapter';
import { DoctorAdapter } from '../../../../medical-provider/users/services/adapters/doctor-adapter';
import { ScheduledEventAdapter } from '../../../../medical-provider/locations/services/adapters/scheduled-event-adapter';
import { PatientAdapter } from '../../../../patient-manager/patients/services/adapters/patient-adapter';
import { Procedure } from '../../../../commons/models/procedure';
import { ProcedureAdapter } from '../../../../commons/services/adapters/procedure-adapter';
import { DiagnosisCode } from '../../../../commons/models/diagnosis-code';
import { DiagnosisCodeAdapter } from '../../../../commons/services/adapters/diagnosis-code-adapter';
import * as _ from 'underscore';

export class PatientVisitAdapter {
    static parseResponse(data: any): PatientVisit {

        let patientVisit = null;
        if (data) {
            let diagnosisCodes: DiagnosisCode[] = [];
            let procedureCodes: Procedure[] = [];

            _.forEach(data.patientVisitDiagnosisCodes, (currentDiagnosisCode: any) => {
                diagnosisCodes.push(DiagnosisCodeAdapter.parseResponse(currentDiagnosisCode.diagnosisCode));
            });
            _.forEach(data.patientVisitProcedureCodes, (currentProcedureCode: any) => {
                procedureCodes.push(ProcedureAdapter.parseResponse(currentProcedureCode.procedureCode));
            });

            patientVisit = new PatientVisit({
                id: data.id,
                calendarEventId: data.calendarEventId,
                caseId: data.caseId,
                patientId: data.patientId,
                patient: PatientAdapter.parseResponse(data.patient2),
                locationId: data.locationId,
                roomId: data.roomId,
                // room: data.room ? RoomsAdapter.parseResponse(data.room):null,
                room: RoomsAdapter.parseResponse(data.room),
                // doctor:data.doctor ? DoctorAdapter.parseResponse(data.doctor):null,
                doctor: DoctorAdapter.parseResponse(data.doctor),
                doctorId: data.doctorId,
                specialty: SpecialityAdapter.parseResponse(data.specialty),
                specialtyId: data.specialtyId,
                eventStart: data.eventStart ? moment.utc(data.eventStart) : null,
                eventEnd: data.eventEnd ? moment.utc(data.eventEnd) : null,
                notes: data.notes,
                visitStatusId: data.visitStatusId,
                visitType: data.visitType,
                calendarEvent: data.calendarEvent ? ScheduledEventAdapter.parseResponse(data.calendarEvent) : null,
                patientVisitProcedureCodes: procedureCodes,
                patientVisitDiagnosisCodes: diagnosisCodes,
                isDeleted: data.isDeleted ? true : false,
                createByUserID: data.createbyuserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateByUserID: data.updateByUserID,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null,
                originalResponse: data
            });

            return patientVisit;
        }
    }
}
