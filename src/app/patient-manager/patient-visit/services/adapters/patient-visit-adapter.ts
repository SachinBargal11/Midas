import { LocationAdapter } from '../../../../medical-provider/users/services/adapters/location-adapter';
import { SpecialityAdapter } from '../../../../account-setup/services/adapters/speciality-adapter';
// import { CaseAdapter } from '../../../cases/services/adapters/case-adapter';
import * as moment from 'moment';
import * as _ from 'underscore';
import { PatientVisit } from '../../models/patient-visit';
import { RoomsAdapter } from '../../../../medical-provider/rooms/services/adapters/rooms-adapter';
import { DoctorAdapter } from '../../../../medical-provider/users/services/adapters/doctor-adapter';
import { ScheduledEventAdapter } from '../../../../medical-provider/locations/services/adapters/scheduled-event-adapter';
import { PatientAdapter } from '../../../../patient-manager/patients/services/adapters/patient-adapter';
// import { DiagnosisCode } from '../../../../commons/models/diagnosis-code';
// import { Procedure } from '../../../../commons/models/procedure';
// import { DiagnosisCodeAdapter } from '../../../../commons/services/adapters/diagnosis-code-adapter';
// import { ProcedureAdapter } from '../../../../commons/services/adapters/procedure-adapter';

export class PatientVisitAdapter {
    static parseResponse(data: any): PatientVisit {

        let patientVisit = null;
        if (data) {
            // let diagnosisCodes: DiagnosisCode[] = [];
            // let procedureCodes: Procedure[] = [];

            // _.forEach(data.patientVisitDiagnosisCodes, (currentDiagnosisCode: any) => {
            //     diagnosisCodes.push(DiagnosisCodeAdapter.parseResponse(currentDiagnosisCode.diagnosisCode));
            // });
            // _.forEach(data.patientVisitProcedureCodes, (currentProcedureCode: any) => {
            //     procedureCodes.push(ProcedureAdapter.parseResponse(currentProcedureCode.procedureCode));
            // });
            patientVisit = new PatientVisit({
                id: data.id,
                calendarEventId: data.calendarEventId,
                // case: CaseAdapter.parseResponse(data.case),
                caseId: data.caseId,
                patientId: data.patientId,
                patient: PatientAdapter.parseResponse(data.patient),
                // locationId: data.locationId,
                location: data.location ? LocationAdapter.parseResponse(data.location) : null,
                roomId: data.roomId,
                room: data.room ? RoomsAdapter.parseResponse(data.room) : null,
                doctor: data.doctor ? DoctorAdapter.parseResponse(data.doctor) : null,
                doctorId: data.doctorId,
                specialty: data.specialty ? SpecialityAdapter.parseResponse(data.specialty) : null,
                specialtyId: data.specialtyId,
                eventStart: data.eventStart ? moment.utc(data.eventStart) : null,
                eventEnd: data.eventEnd ? moment.utc(data.eventEnd) : null,
                notes: data.notes,
                visitStatusId: data.visitStatusId,
                // visitType: data.visitType,
                calendarEvent: data.calendarEvent ? ScheduledEventAdapter.parseResponse(data.calendarEvent) : null,
                // patientVisitDiagnosisCodes: diagnosisCodes,
                // patientVisitProcedureCodes: procedureCodes,
                // isOutOfOffice: data.isOutOfOffice ? true : false,
                // leaveStartDate: data.leaveStartDate,
                // leaveEndDate: data.leaveEndDate,
                // transportProviderId: data.transportProviderId,
                isDeleted: data.isDeleted ? true : false,
                createByUserID: data.createbyuserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateByUserID: data.updateByUserID,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null,
                companyid: data.companyid,
                attorneyId: data.attorneyId,
                // agenda: data.agenda,
                name: data.subject,
                contactPerson:data.contactPerson,
                originalResponse: data
            });
        }

        return patientVisit;
    }
}
