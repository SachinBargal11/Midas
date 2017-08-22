
import { CaseAdapter } from '../../../cases/services/adapters/case-adapter';
import * as moment from 'moment';
import * as _ from 'underscore';
import { ImeVisit } from '../../models/ime-visit';
import { ScheduledEventAdapter } from '../../../../medical-provider/locations/services/adapters/scheduled-event-adapter';
import { PatientAdapter } from '../../../../patient-manager/patients/services/adapters/patient-adapter';
import { LocationAdapter } from '../../../../medical-provider/users/services/adapters/location-adapter';

export class ImeVisitAdapter {
    static parseResponse(data: any): ImeVisit {

        let imeVisit = null;

        imeVisit = new ImeVisit({
            id: data.id,
            calendarEventId: data.calendarEventId,
            // locationId: data.locationId,
            // location: data.location ? LocationAdapter.parseResponse(data.location) : null,
            case: CaseAdapter.parseResponse(data.case),
            caseId: data.caseId,
            patient: PatientAdapter.parseResponse(data.patient),
            patientId: data.patientId,
            doctorName: data.doctorName,
            transportProviderId: data.transportProviderId,
            eventStart: data.eventStart ? moment.utc(data.eventStart) : null,
            eventEnd: data.eventEnd ? moment.utc(data.eventEnd) : null,
            notes: data.notes,
            visitStatusId: data.visitStatusId,
            calendarEvent: data.calendarEvent ? ScheduledEventAdapter.parseResponse(data.calendarEvent) : null,
            isDeleted: data.isDeleted ? true : false,
            createByUserID: data.createbyuserID,
            createDate: data.createDate ? moment.utc(data.createDate) : null,
            updateByUserID: data.updateByUserID,
            updateDate: data.updateDate ? moment.utc(data.updateDate) : null,
            VisitCreatedByCompanyId: data.VisitCreatedByCompanyId,

        });

        return imeVisit;
    }
}
