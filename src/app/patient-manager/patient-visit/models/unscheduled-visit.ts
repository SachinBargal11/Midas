import { Room } from '../../../medical-provider/rooms/models/room';
import { Tests } from '../../../medical-provider/rooms/models/tests';
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
    calendarEventId:0,
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
    referralId: 0,
    status: '',
    orignatorCompanyId: 0,
    visitStatusId:0,
    visitUpdateStatus: true,
    // visitStatusId: VisitStatus.SCHEDULED,
     calendarEvent: null,
    // isDeleted: false,
    // createByUserId: 0,
    // updateByUserId: 0,
    // createDate: null,
    // updateDate: null,
});


export class UnscheduledVisit extends UnscheduledVisitRecord implements IEventWrapper {

    id: number;
    calendarEventId: number;
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
    roomTest: Tests;
    roomTestId: number;
    notes: string;
    referralId: number;
    status: string;
    orignatorCompanyId: number;
    visitTimeStatus: boolean;
    visitUpdateStatus: boolean;
    visitStatusId: number;
    // visitStatusId: VisitStatus;
     calendarEvent: ScheduledEvent;
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

    get eventColor(): string {        
            return this.specialty ? this.specialty.color : '';        
        // let colorCodes: any = ['#7A3DB8', '#7AB83D', '#CC6666', '#7AFF7A', '#FF8000'];
        // // let color: any = _.sample(colorCodes);
        // if (this.doctorId) {
        //     return '#7A3DB8';
        // } else {
        //     return '#CC6666';
        // }
        // return color;
    }

    get visitStatusLabel(): string {
        return UnscheduledVisit.getvisitStatusLabel(this.visitStatusId);
    }

    static getvisitStatusLabel(visitStatus: VisitStatus): string {
        switch (visitStatus) {
            case VisitStatus.SCHEDULED:
                return 'Scheduled';
            case VisitStatus.COMPLETE:
                return 'Complete';
            case VisitStatus.RESCHEDULE:
                return 'Rescheduled';
            case VisitStatus.NOSHOW:
                return 'Noshow';
        }
    }

    get visitDisplayString(): string {     
        let visitInfo: string = ``;
        
            visitInfo = `${visitInfo}Location Name: ${this.locationName} - `;

        if (this.patientId && this.caseId && this.patient) {            
            visitInfo = `${visitInfo}Patient Name: ${this.patient.user.firstName} ${this.patient.user.lastName} - Case Id: ${this.caseId} - `;
        }
       
        visitInfo = `${visitInfo}Doctor Name: ${this.doctorName}`;
        if (this.specialtyId && this.specialty) {
            visitInfo = `${visitInfo} - Speciality: ${this.specialty.name}`;
        }

        if (this.eventStart) {
            visitInfo = `${visitInfo} - Visit Start: ${this.eventStart.local().format('MMMM Do YYYY')}`;
        }

        return visitInfo;
    }   
}