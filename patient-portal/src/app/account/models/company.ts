import { Record } from 'immutable';
import { CompanyType } from './enums/company-type';

const CompanyRecord = Record({
    id: 0,
    name: '',
    taxId: '',
    companyType: CompanyType.NONE
});

export class Company extends CompanyRecord {

    id: number;
    name: string;
    taxId: string;
    companyType: CompanyType;

    constructor(props) {
        super(props);
    }

    get companyTypeLabel(): string {
        return Company.getLabel(this.companyType);
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


}