import { Record } from 'immutable';
import * as moment from 'moment';
import { Address } from '../../../commons/models/address';
import { Contact } from '../../../commons/models/contact';

const InsuranceRecord = Record({
    id: 0,
    patientId: 0,
    policyNo: 0,
    policyOwnerId: 0,
    policyHoldersName: '',
    contactPerson: '',
    claimfileNo: '',
    wcbNo: '',
    insuranceType: '',
    insuranceCompanyCode: '',
    isPrimaryInsurance: 0,
    isinactive: 0,
    policyAddress: null,
    policyContact: null,
    insuranceAddress: null,
    insuranceContact: null
});

export class Insurance extends InsuranceRecord {

    id: number;
    patientId: number;
    policyNo: number;
    policyOwnerId: number;
    policyHoldersName: string;
    contactPerson: string;
    claimfileNo: string;
    wcbNo: string;
    insuranceType: string;
    insuranceCompanyCode: string;
    isPrimaryInsurance: boolean;
    isinactive: boolean;
    policyAddress: Address;
    policyContact: Contact;
    insuranceAddress: Address;
    insuranceContact: Contact;

    constructor(props) {
        super(props);
    }

}