
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
            // case: CaseAdapter.parseResponse(data.case),
            caseId: data.caseId,
            // patient: PatientAdapter.parseResponse(data.patient),
            patientId: data.patientId,
            eventStart: data.eventStart ? moment.utc(data.eventStart) : null,
            medicalProviderName: data.medicalProviderName,
            doctorName: data.doctorName,
            specialty: data.specialty,
            roomTest: data.roomTest,
            specialtyId: data.specialtyId,
            roomTestId: data.roomTestId,
            notes: data.notes,
            referralId: data.referralId,
            status:data.status


        });

        return unscheduledVisit;
    }
}
