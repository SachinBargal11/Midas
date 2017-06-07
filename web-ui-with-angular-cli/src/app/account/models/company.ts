import { Record } from 'immutable';
import { CompanyType } from './enums/company-type';

const CompanyRecord = Record({
    id: 0,
    name: '',
    taxId: '',
    companyType: CompanyType.MEDICALPROVIDER,
    subscriptionType: 0,
    companyStatusTypeId: 0
});

export class Company extends CompanyRecord {

    id: number;
    name: string;
    taxId: string;
    companyType: CompanyType;
    subscriptionType: number;
    companyStatusTypeId: number;

    constructor(props) {
        super(props);
    }

}