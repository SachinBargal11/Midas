import { Record } from 'immutable';
import * as moment from 'moment';
import { Address } from '../../../commons/models/address';
import { Contact } from '../../../commons/models/contact';

const EmployerRecord = Record({
    id: 0,
    patientId: 0,
    jobTitle: '',
    empName: '',
    isCurrentEmp: 1,
    createByUserID: 0,
    createDate: moment(),
    address: null,
    contact: null
});

export class Employer extends EmployerRecord {

    id: number;
    patientId: number;
    jobTitle: string;
    empName: string;
    isCurrentEmp: number;
    createByUserID: number;
    createDate: moment.Moment;
    address: Address;
    contact: Contact;

    constructor(props) {
        super(props);
    }

}