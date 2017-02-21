import { Record } from 'immutable';
import * as moment from 'moment';
import { Address } from '../../commons/models/address';
import { Contact } from '../../commons/models/contact';
import { InsuranceType } from './enums/insurance-type';
import { PolicyOwner } from './enums/policy-owner';

const InsuranceRecord = Record({
    id: 0,
    patientId: 0,
    policyNo: '',
    policyOwnerId: 0,
    policyHoldersName: '',
    contactPerson: '',
    claimfileNo: '',
    wcbNo: '',
    insuranceType: InsuranceType.PRIMARY,
    insuranceCompanyCode: '',
    isinactive: 0,
    policyAddress: null,
    policyContact: null,
    insuranceAddress: null,
    insuranceContact: null
});

export class Insurance extends InsuranceRecord {

    id: number;
    patientId: number;
    policyNo: string;
    policyOwnerId: number;
    policyHoldersName: string;
    contactPerson: string;
    claimfileNo: string;
    wcbNo: string;
    insuranceType: InsuranceType;
    insuranceCompanyCode: string;
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
}
