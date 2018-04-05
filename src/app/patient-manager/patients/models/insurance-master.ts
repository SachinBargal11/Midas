import { Record } from 'immutable';
import * as moment from 'moment';
import { InsuranceAddress } from '../../../commons/models/insurance-address';
import { Contact } from '../../../commons/models/contact';
import { Adjuster } from '../../../account-setup/models/adjuster';
import { InsuranceType } from './enums/insurance-type';
import { PolicyOwner } from './enums/policy-owner';

const InsuranceMasterRecord = Record({
    id: 0,
    companyCode: 0,
    companyName: '',
    InsuranceAddress: [],
    Contact: null,
    adjusterMasters: null,
    Only1500Form: '',
    paperAuthorization: '',
    priorityBilling: '',
    zeusID: 0,
    createdByCompanyId: 0,
    insuranceMasterTypeId: 0

});

export class InsuranceMaster extends InsuranceMasterRecord {

    id: number;
    companyCode: number;
    companyName: string;
    policyOwnerId: number;
    InsuranceAddress: InsuranceAddress[];
    Contact: Contact;
    adjusterMasters: Adjuster;
    Only1500Form: string;
    paperAuthorization: string;
    priorityBilling: string;
    zeusID: number;
    createdByCompanyId: number;
    insuranceMasterTypeId: number;

    constructor(props) {
        super(props);
    }
}