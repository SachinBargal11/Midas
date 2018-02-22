import { Room } from '../../../medical-provider/rooms/models/room';
import { Speciality } from '../../../account-setup/models/speciality';
import { Status } from 'tslint/lib/runner';
import { Case } from '../../cases/models/case';
import { IEventWrapper } from '../../../commons/models/i-event-wrapper';
import { ScheduledEventInstance } from '../../../commons/models/scheduled-event-instance';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import { Record } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';
import * as RRule from 'rrule';
import { VisitStatus } from './enums/visit-status';
import { Patient } from '../../../patient-manager/patients/models/patient';

const UnscheduledVisitRecord = Record({
    id: 0,
    isUnscheduledVisitType: true,
    case: null,
    caseId: 0,
    patient: null,
    patientId: 0,
    eventStart: null,
    medicalProviderName: '',
    locationName: '',
    doctorName: '',
    specialty: null,
    specialtyId: 0,
    roomTest: null,
    roomTestId: 0,
    notes: '',
    referralId: null,
    status: '',
    orignatorCompanyId: 0,
    // visitStatusId: VisitStatus.SCHEDULED,
    // calendarEvent: null,
    // isDeleted: false,
    // createByUserId: 0,
    // updateByUserId: 0,
    // createDate: null,
    // updateDate: null,
});


export class UnscheduledVisit extends UnscheduledVisitRecord {

    id: number;
    isUnscheduledVisitType: boolean;
    case: Case;
    caseId: number;
    patient: Patient;
    patientId: number;
    eventStart: moment.Moment;
    medicalProviderName: string;
    locationName: string;
    doctorName: string;
    specialty: Speciality;
    specialtyId: number;
    roomTest: Room;
    roomTestId: number
    notes: string;
    referralId: number;
    status: string;
    orignatorCompanyId: number;
    // visitStatusId: VisitStatus;
    // calendarEvent: ScheduledEvent;
    // isDeleted: boolean;
    // createByUserId: number;
    // updateByUserId: number;
    // createDate: moment.Moment;
    // updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }

  isCreatedByCompany(companyId): boolean {
        let isCreatedByCompany: boolean = false;
        if (this.orignatorCompanyId === companyId) {
            isCreatedByCompany = true;
        }
        return isCreatedByCompany;
    }

}