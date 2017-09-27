import { Record } from 'immutable';
import * as moment from 'moment';
import { User } from './user';

const UserSettingRecord = Record({
    id: 0,
    user: null,
    userId:0,
    companyId:0,
    isPublic: false,
    isSearchable:false,
    isCalendarPublic: false,
    SlotDuration:0,
    calendarViewId:0
});

export class UserSetting extends UserSettingRecord {

    id: number;
    user: User;
    userId:number;
    companyId:number;
    isPublic: boolean;
    isSearchable: boolean;
    isCalendarPublic: boolean;
    SlotDuration: number;
    calendarViewId:number;

    constructor(props) {
        super(props);
    }
}