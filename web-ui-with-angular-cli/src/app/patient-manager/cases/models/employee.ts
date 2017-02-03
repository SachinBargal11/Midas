import { Record } from 'immutable';
import * as moment from 'moment';
import { Address } from '../../../commons/models/address';
import { Contact } from '../../../commons/models/contact';

const EmployeeRecord = Record({
    id: 0,
    patientId: 0,
    jobTitle: '',
    empName: '',
    isCurrentEmp: 0,
    createByUserID: 0,
    createDate: moment(),
    address: null,
    contact: null
});

export class Employee extends EmployeeRecord {

    id: number;
    patientId: number;
    jobTitle: string;
    empName: string;
    isCurrentEmp: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    address: Address;
    contact: Contact;

    constructor(props) {
        super(props);
    }

}