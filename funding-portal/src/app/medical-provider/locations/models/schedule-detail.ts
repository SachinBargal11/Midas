import * as moment from 'moment';
import { Record } from 'immutable';


const ScheduleDetailRecord = Record({
    id: 0,
    name: '',
    dayofWeek: 0,
    dayofWeekString: null,
    slotStart: null,
    slotEnd: null,
    slotDate: null,
    scheduleStatus: 0,
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null
});

export class ScheduleDetail extends ScheduleDetailRecord {

    id: number;
    name: string;
    dayofWeek: number;
    dayofWeekString: string;
    slotStart: moment.Moment;
    slotEnd: moment.Moment;
    slotDate: moment.Moment;
    scheduleStatus: number;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;

    static getScheduleStatusLabel(scheduleStatus: number): string {
        switch (scheduleStatus) {
            case 0:
                return 'Closed';
            case 1:
                return 'Specific Hours';
            default:
                return 'N/A';
        }
    }

    constructor(props) {
        super(props);
    }

    getLabelForDayOfWeek(dayofWeek) {
        return moment().weekday(dayofWeek - 1).format('dddd');
    }

    isInAllowedSlot(date: moment.Moment, considerTime: boolean = false): boolean {
        if ((date.isoWeekday() % 7) + 1 === this.dayofWeek) {
            if (this.scheduleStatus === 0) {
                return false;
            } else {
                if (considerTime) {
                    if (date.hour() > this.slotStart.hour() && date.hour() < this.slotEnd.hour()) {
                        return true;
                    } else if (date.hour() === this.slotStart.hour() && date.minute() >= this.slotStart.minute()) {
                        return true;
                    } else if (date.hour() === this.slotEnd.hour() && date.minute() <= this.slotEnd.minute()) {
                        return true;
                    }
                    return false;
                }
                return true;
            }
        }
        return false;
    }
}