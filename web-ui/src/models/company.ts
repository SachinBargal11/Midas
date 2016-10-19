import {Record} from 'immutable';
import {CompanyType} from './enums/CompanyType';
import {SubscriptionPlan} from './enums/SubscriptionPlan';

const CompanyRecord = Record({
    id: 0,
    companyName: '',
    contactName: '',
    taxId: '',
    phoneNo: '',
    companyType: CompanyType.MedicalProvider,
    email: '',
    subscriptionPlan: SubscriptionPlan.SingleUser
});

export class Company extends CompanyRecord {

    id: number;
    companyName: string;
    contactName: string;
    taxId: string;
    phoneNo: string;
    companyType: CompanyType;
    email: string;
    subscriptionPlan: SubscriptionPlan;

    constructor(props) {
        super(props);
    }

}