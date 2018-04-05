import { Record } from 'immutable';
import * as moment from 'moment';
import { RoleType } from './enums/roles';

const UserRoleRecord = Record({
    id: 0,
    name: null,
    roleType: RoleType.REGULAR_STAFF,
    companyId:0,
});

export class UserRole extends UserRoleRecord {

    id: number;
    name: string;
    roleType: RoleType;
    companyId:number;

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
            case RoleType.ATTORNEY:
                return 'Attorney';    
        }
    }
}