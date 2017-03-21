import { Record } from 'immutable';
import { RoleType } from './enums/roles';

const UserRoleRecord = Record({
    name: null,
    roleType: null,
    status: null
});

export class UserRole extends UserRoleRecord {

    id: number;
    name: string;
    roleType: string;
    status: string;

    constructor(props) {
        super(props);
    }

    static getUserRoleLabel(roleType: RoleType): string {
        switch (roleType) {
            case RoleType.REGULAR_STAFF:
                return 'Regular Staff';
            case RoleType.DOCTOR:
                return 'Doctor';
            case RoleType.OFFICE_MANAGER:
                return 'Office Manager';
            case RoleType.BILLING_STAFF:
                return 'Billing Staff';
            case RoleType.NURSE:
                return 'Nurse';
        }
    }

}
