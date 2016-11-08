import {Record} from 'immutable';
import {CompanyType} from './enums/CompanyType';
import {SubscriptionPlan} from './enums/SubscriptionPlan';

const CompanyRecord = Record({
company: {
    id: 0,
    name: '',
    // contactName: '',
    taxId: '',
    // phoneNo: '',
    companyType: '',
    // email: '',
    // subscriptionPlan: SubscriptionPlan.SingleUser,
    status: '',
    subsCriptionType: ''
},
user: {
    id: 0,
    userName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    userType: '',
    password: ''
},
role: {
    id: 0,
    name: '',
    roleType: '',
    status: ''
}
});

export class Company extends CompanyRecord {
company: {
    id: number;
    name: string;
    // contactName: string;
    taxId: string;
    // phoneNo: string;
    companyType: string;
    // email: string;
    // subscriptionPlan: SubscriptionPlan;
    status: string;
    subsCriptionType: string;
};
user: {
    id: number;
    userName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    userType: string;
    password: string;
};
role: {
    id: number;
    name: string;
    roleType: string;
    status: string;
};

    constructor(props) {
        super(props);
    }

}