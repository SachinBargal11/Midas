import { Record } from 'immutable';
import { Company } from './company';
import { UserRole } from './user-role';
import { User } from './user';
import { AccountStatus } from './enums/account-status';
import { SubscriptionPlan } from './enums/subscription-plan';

const AccountRecord = Record({
    companies: null,
    user: null,
    role: null,
    accountStatus: AccountStatus.IN_ACTIVE,
    subscriptionPlan: SubscriptionPlan.TRIAL
});

export class Account extends AccountRecord {
    companies: Company[];
    user: User;
    role: UserRole;
    accountStatus: AccountStatus;
    subscriptionPlan: SubscriptionPlan;

    constructor(props) {
        super(props);
    }

}