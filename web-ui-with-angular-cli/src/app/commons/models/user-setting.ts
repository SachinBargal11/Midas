import { Record } from 'immutable';
import * as moment from 'moment';
import { RoleType } from './enums/roles';

const UserSettingRecord = Record({
    id: 0,
    roleType: RoleType.REGULAR_STAFF,
    isPublicProfile: false,
    isPublishCalender: false,
});

export class UserSetting extends UserSettingRecord {

    id: number;
    roleType: RoleType;
    isPublicProfile: boolean;
    isPublishCalender: boolean;

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