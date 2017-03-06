import * as moment from 'moment';
import { PatientVisit } from '../../models/patient-visit';
import { ScheduledEventAdapter } from '../../../../medical-provider/locations/services/adapters/scheduled-event-adapter';

export class PatientVisitAdapter {
    static parseResponse(data: any): PatientVisit {

        let patientVisit = null;
        if (data) {
            patientVisit = new PatientVisit({
                id: data.id,
                calendarEventId: data.calendarEventId,
                caseId: data.caseId,
                patientId: data.patientId,
                locationId: data.locationId,
                roomId: data.roomId,
                doctorId: data.doctorId,
                specialtyId: data.specialtyId,
                eventStart: data.eventStart ? moment.utc(data.eventStart) : null,
                eventEnd: data.eventEnd ? moment.utc(data.eventEnd) : null,
                notes: data.notes,
                visitStatusId: data.visitStatusId,
                visitType: data.visitType,
                calendarEvent: ScheduledEventAdapter.parseResponse(data.calendarEvent),
                isDeleted: data.isDeleted ? true : false,
                createByUserID: data.createbyuserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateByUserID: data.updateByUserID,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null
            });
        }
        return patientVisit;
    }
}
