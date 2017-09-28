import { Record } from 'immutable';
import * as moment from 'moment';
import { User } from './user';
import { CalendarView  } from './enums/calendar-view';

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

     get calendarViewLabel(): string {
        return UserSetting.getCalendarTypeLabel(this.calendarViewId);
    }
    // tslint:disable-next-line:member-ordering
    static getCalendarTypeLabel(calendarView: CalendarView): string {
        switch (calendarView) {
            case CalendarView.Month:
                return 'month';
            case CalendarView.Week:
                return 'agendaWeek';
            case CalendarView.Day:
                return 'agendaDay';
        }
    }
}