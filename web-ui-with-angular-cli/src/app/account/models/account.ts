import { Record } from 'immutable';
import { Company } from './company';
import { UserRole } from '../../commons/models/user-role';
import { User } from '../../commons/models/user';
import { AccountStatus } from '../../commons/models/enums/account-status';
import { SubscriptionPlan } from '../../commons/models/enums/subscription-plan';
import * as moment from 'moment';

const AccountRecord = Record({
    companies: null,
    user: null,
    role: null,
    accountStatus: AccountStatus.IN_ACTIVE,
    subscriptionPlan: SubscriptionPlan.TRIAL,
    accessToken: '',
    tokenExpiresAt: null
});

export class Account extends AccountRecord {
    companies: Company[];
    user: User;
    role: UserRole;
    accountStatus: AccountStatus;
    subscriptionPlan: SubscriptionPlan;
    accessToken: string;
    tokenExpiresAt: any;

    constructor(props) {
        super(props);
    }

}