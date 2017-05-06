import { Record } from 'immutable';
import { CompanyType } from './enums/company-type';

const CompanyRecord = Record({
    id: 0,
    name: '',
    taxId: '',
    companyType: CompanyType.NONE,
    subscriptionType: 0,
});

export class Company extends CompanyRecord {

    id: number;
    name: string;
    taxId: string;
    companyType: CompanyType;
    subscriptionType: number;
    constructor(props) {
        super(props);
    }

}