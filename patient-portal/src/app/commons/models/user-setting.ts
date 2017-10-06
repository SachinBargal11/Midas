import { Record } from 'immutable';
import * as moment from 'moment';
import { Patient } from '../../patient-manager/patients/models/patient';
import { CalendarView } from './enums/calendar-view';
import { PreferredView } from './enums/preferred-ui-view';

const UserSettingRecord = Record({
    id: 0,
    // patient: null,
    patientId: 0,
    preferredModeOfCommunication: 0,
    isPushNotificationEnabled: false,
    calendarViewId: 0,
    preferredUIViewId:1

});

export class UserSetting extends UserSettingRecord {

    id: number;
    // patient: Patient;
    patientId: number;
    preferredModeOfCommunication: number;
    isPushNotificationEnabled: boolean;
    calendarViewId: number;
    preferredUIViewId: number;

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
    get preferedViewLabel(): string {
        return UserSetting.getpreferedViewTypeLabel(this.preferredUIViewId);
    }
    // tslint:disable-next-line:member-ordering
    static getpreferedViewTypeLabel(preferedView: PreferredView): string {
        switch (preferedView) {
            case PreferredView.TabView:
                return 'Tab View';
            case PreferredView.CollapsableView:
                return 'Collapsable View';
        }
    }
}