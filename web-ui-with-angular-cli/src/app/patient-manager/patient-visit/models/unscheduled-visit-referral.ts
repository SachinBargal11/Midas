import { Record } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';
import { UnscheduledVisit } from './unscheduled-visit';

const UnscheduledVisitReferralRecord = Record({
    pendingReferralId: 0,
    patientVisitUnscheduled: null
});


export class UnscheduledVisitReferral extends UnscheduledVisitReferralRecord {

    pendingReferralId: number;
    patientVisitUnscheduled: UnscheduledVisit;

    constructor(props) {
        super(props);
    }
   
}