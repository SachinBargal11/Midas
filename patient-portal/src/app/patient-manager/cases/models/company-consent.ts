import { Record } from 'immutable';
import { CompanyType } from '../../../account/models/enums/company-type';
import { Consent } from '../../cases/models/consent';
import { CaseDocument } from './case-document';

const CompanyConsentRecord = Record({
    id: 0,
    caseId: 0,
    name: '',
    taxId: '',
    companyType: CompanyType.NONE,
    companyCaseConsentApproval: null,
    caseCompanyConsentDocument: null,
});

export class CompanyConsent extends CompanyConsentRecord {

    id: number;
    caseId: number;
    name: string;
    taxId: string;
    companyType: CompanyType;
    companyCaseConsentApproval: Consent[];
    caseCompanyConsentDocument: CaseDocument[];

    constructor(props) {
        super(props);
    }

    get companyTypeLabel(): string {
        return CompanyConsent.getLabel(this.companyType);
    }
    // tslint:disable-next-line:member-ordering
    static getLabel(companyType: CompanyType): string {
        switch (companyType) {
            case CompanyType.NONE:
                return 'None';
            case CompanyType.MEDICALPROVIDER:
                return 'Medical Provider';
            case CompanyType.ATTORNEY:
                return 'Attorney Provider';
            case CompanyType.BILLING:
                return 'Billing Provider';
            case CompanyType.FUNDING:
                return 'Funding Provider';
            case CompanyType.COLLECTION:
                return 'Collection Provider';
            case CompanyType.ANCILLARY:
                return 'Ancillary Provider';
        }
    }

     isConsentReceived(): boolean {
        let isConsentReceived: boolean = false;
        if (this.companyCaseConsentApproval != null) {
            return isConsentReceived = true;
        }
        return isConsentReceived;

    }


}