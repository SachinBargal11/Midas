import { Record } from 'immutable';
import * as moment from 'moment';
import { Address } from '../../commons/models/address';
import { Contact } from '../../commons/models/contact';

const EmployerRecord = Record({
    id: 0,
    caseId: 0,
    jobTitle: '',
    empName: '',
    isCurrentEmp: false,
    createByUserID: 0,
    createDate: moment(),
    address: null,
    contact: null,
    salary: null,
    hourOrYearly: false,
    lossOfEarnings: false,
    datesOutOfWork: null,
    hoursPerWeek: null,
    accidentAtEmployment: false,
});

export class Employer extends EmployerRecord {

    id: number;
    caseId: number;
    jobTitle: string;
    empName: string;
    isCurrentEmp: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    address: Address;
    contact: Contact;
    salary: string;
    hourOrYearly: boolean;
    lossOfEarnings: boolean;
    datesOutOfWork: string;
    hoursPerWeek: string;
    accidentAtEmployment: boolean;

    constructor(props) {
        super(props);
    }

}