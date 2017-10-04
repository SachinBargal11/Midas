import { Record } from 'immutable';
import * as moment from 'moment';
import { Address } from '../../../commons/models/address';
import { Contact } from '../../../commons/models/contact';
import { InsuranceMapping } from '../../cases/models/insurance-mapping';
import { InsuranceType } from './enums/insurance-type';
import { PolicyOwner } from './enums/policy-owner';
import { InsuranceMaster } from './insurance-master';
import { PreferredCommunication } from '../../../commons/models/enums/preferred-communication';

const InsuranceRecord = Record({
    id: 0,
    caseId: 0,
    policyNo: '',
    policyOwnerId: 0,
    policyHoldersName: '',
    contactPerson: '',
    insuranceStartDate: moment(),
    insuranceEndDate: moment(),
    balanceInsuredAmount: '',
    insuranceMasterId: 0,
    insuranceMaster: null,
    insuranceType: InsuranceType.PRIMARY,
    insuranceCompanyCode: '',
    caseInsuranceMapping: null,
    isinactive: false,
    policyAddress: null,
    policyContact: null,
    insuranceAddress: null,
    insuranceContact: null
});

export class Insurance extends InsuranceRecord {

    id: number;
    caseId: number;
    policyNo: string;
    policyOwnerId: number;
    policyHoldersName: string;
    contactPerson: string;
    insuranceStartDate: moment.Moment;
    insuranceEndDate: moment.Moment;
    balanceInsuredAmount: string
    insuranceMasterId: number;
    insuranceMaster: InsuranceMaster;
    insuranceType: InsuranceType;
    insuranceCompanyCode: string;
    caseInsuranceMapping: InsuranceMapping;
    isinactive: boolean;
    policyAddress: Address;
    policyContact: Contact;
    insuranceAddress: Address;
    insuranceContact: Contact;

    constructor(props) {
        super(props);
    }

    get insuranceTypeLabel(): string {
        return Insurance.getInsuranceTypeLabel(this.insuranceType);
    }

    // tslint:disable-next-line:member-ordering
    static getInsuranceTypeLabel(insuranceType: InsuranceType): string {
        switch (insuranceType) {
            case InsuranceType.PRIMARY:
                return 'Primary';
            case InsuranceType.SECONDARY:
                return 'Secondary';
        }
    }

    get policyOwnerLabel(): string {
        return Insurance.getPolicyOwnerLabel(this.policyOwnerId);
    }

    static getPolicyOwnerLabel(policyOwner: PolicyOwner): string {
        switch (policyOwner) {
            case PolicyOwner.SELF:
                return 'Self';
            case PolicyOwner.SPOUS:
                return 'Spous';
            case PolicyOwner.CHILD:
                return 'Child';
            case PolicyOwner.OTHER:
                return 'Other';
        }
    }

    get preferredCommunicationLabel(): string {
        if (this.insuranceContact.preferredCommunication) {
            return Insurance.getPreferredCommunicationLabel(this.insuranceContact.preferredCommunication);
        } else if (this.policyContact.preferredCommunication) {
            return Insurance.getPreferredCommunicationLabel(this.policyContact.preferredCommunication);
        }
    }

    static getPreferredCommunicationLabel(preferredCommunication: PreferredCommunication): string {
        switch (preferredCommunication) {
            case PreferredCommunication.CELLPHONE:
                return 'Cellphone';
            case PreferredCommunication.EMAIL:
                return 'Email';
            case PreferredCommunication.WORKPHONE:
                return 'Workphone';
            case PreferredCommunication.POST:
                return 'Post';
        }
    }
}
