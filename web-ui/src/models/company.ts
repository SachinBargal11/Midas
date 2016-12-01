import { Record } from 'immutable';
import { CompanyType } from './enums/company-type';
import moment from 'moment';

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

}