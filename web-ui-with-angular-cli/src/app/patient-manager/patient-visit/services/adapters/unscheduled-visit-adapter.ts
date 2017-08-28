
import { CaseAdapter } from '../../../cases/services/adapters/case-adapter';
import * as moment from 'moment';
import * as _ from 'underscore';
import { UnscheduledVisit } from '../../models/unscheduled-visit';
import { ScheduledEventAdapter } from '../../../../medical-provider/locations/services/adapters/scheduled-event-adapter';
import { PatientAdapter } from '../../../../patient-manager/patients/services/adapters/patient-adapter';
import { LocationAdapter } from '../../../../medical-provider/users/services/adapters/location-adapter';

export class UnscheduledVisitAdapter {
    static parseResponse(data: any): UnscheduledVisit {

        let unscheduledVisit = null;

        unscheduledVisit = new UnscheduledVisit({
            id: data.id,
            case: CaseAdapter.parseResponse(data.case),
            caseId: data.caseId,
            patient: PatientAdapter.parseResponse(data.patient),
            patientId: data.patientId,
            eventStart: data.eventStart ? moment.utc(data.eventStart) : null,
            medicalProviderName: data.medicalProviderName,
            doctorName: data.doctorName,
            notes: data.notes,
            speciality: data.speciality,
            status: data.status,
            // visitStatusId: data.visitStatusId,
            // calendarEvent: data.calendarEvent ? ScheduledEventAdapter.parseResponse(data.calendarEvent) : null,
            // isDeleted: data.isDeleted ? true : false,
            // createByUserID: data.createbyuserID,
            // createDate: data.createDate ? moment.utc(data.createDate) : null,
            // updateByUserID: data.updateByUserID,
            // updateDate: data.updateDate ? moment.utc(data.updateDate) : null,
        });

        return unscheduledVisit;
    }
}
