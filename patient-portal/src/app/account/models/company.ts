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
            case CompanyType.MEDICAL_PROVIDER:
                return 'Medical Provider';
            case CompanyType.PI_BI_FIRM:
                return 'Attorney Provider';
            case CompanyType.COLLECTION_FIRM:
                return 'Collection';
            case CompanyType.TRANSPORTATION:
                return 'Transportation';
        }
    }


}