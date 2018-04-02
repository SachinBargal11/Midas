import { CaseAdapter } from '../../../cases/services/adapters/case-adapter';
import * as moment from 'moment';
import * as _ from 'underscore';
import { EoVisit } from '../../models/eo-visit';
import { ScheduledEventAdapter } from '../../../../medical-provider/locations/services/adapters/scheduled-event-adapter';
import { PatientAdapter } from '../../../../patient-manager/patients/services/adapters/patient-adapter';
import { LocationAdapter } from '../../../../medical-provider/users/services/adapters/location-adapter';
import { DoctorAdapter } from '../../../../medical-provider/users/services/adapters/doctor-adapter';

export class EoVisitAdapter {
    static parseResponse(data: any): EoVisit {

        let eoVisit = null;

        eoVisit = new EoVisit({
            id: data.id,
            calendarEventId: data.calendarEventId,
            locationId: data.locationId,
            location: data.location ? LocationAdapter.parseResponse(data.location) : null,
            case: CaseAdapter.parseResponse(data.case),
            caseId: data.caseId,
            doctor: data.doctor ? DoctorAdapter.parseResponse(data.doctor) : null,
            doctorId: data.doctorId,
            patient: PatientAdapter.parseResponse(data.patient),
            patientId: data.patientId,
            insuranceProviderId: data.insuranceProviderId,
            VisitCreatedByCompanyId: data.VisitCreatedByCompanyId,
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

        });

        return eoVisit;
    }
}
