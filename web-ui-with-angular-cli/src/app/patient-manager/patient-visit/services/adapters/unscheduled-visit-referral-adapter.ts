import * as moment from 'moment';
import * as _ from 'underscore';
import { UnscheduledVisit } from '../../models/unscheduled-visit';
import { UnscheduledVisitReferral } from '../../models/unscheduled-visit-referral';
import { UnscheduledVisitAdapter } from './unscheduled-visit-adapter';

export class UnscheduledVisitReferralAdapter {
    static parseResponse(data: any): UnscheduledVisitReferral {

        let unscheduledVisitReferral = null;

        unscheduledVisitReferral = new UnscheduledVisitReferral({
            pendingReferralId: data.pendingReferralId,
            patientVisitUnscheduled: UnscheduledVisitAdapter.parseResponse(data.patientVisitUnscheduled)            
        });

        return unscheduledVisitReferral;
    }
}
