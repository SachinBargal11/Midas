import { Record } from 'immutable';
import * as moment from 'moment';
import { Address } from '../../../commons/models/address';
import { Contact } from '../../../commons/models/contact';

const InsuranceRecord = Record({
    id: 0,
    patientId: 0,
    policyNo: 0,
    policyHoldersName: '',
    isPrimaryInsurance: 0,
    address: null,
    contact: null
});

export class Insurance extends InsuranceRecord {

    id: number;
    patientId: number;
    policyNo: number;
    policyHoldersName: string;
    isPrimaryInsurance: boolean;
    address: Address;
    contact: Contact;

    constructor(props) {
        super(props);
    }

}