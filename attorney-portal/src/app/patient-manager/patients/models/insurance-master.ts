import { Record } from 'immutable';
import * as moment from 'moment';
import { Address } from '../../../commons/models/address';
import { Contact } from '../../../commons/models/contact';
import { Adjuster } from '../../../account-setup/models/adjuster';
import { InsuranceType } from './enums/insurance-type';
import { PolicyOwner } from './enums/policy-owner';

const InsuranceMasterRecord = Record({
    id: 0,
    companyCode: 0,
    companyName: '',
    Address: null,
    Contact: null,
    adjusterMasters: null

});

export class InsuranceMaster extends InsuranceMasterRecord {

    id: number;
    companyCode: number;
    companyName: string;
    policyOwnerId: number;
    Address: Address;
    Contact: Contact;
    adjusterMasters: Adjuster;


    constructor(props) {
        super(props);
    }
}
