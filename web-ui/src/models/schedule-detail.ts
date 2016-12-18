import moment from 'moment';
import { Record } from 'immutable';


const ScheduleDetailRecord = Record({
    id: 0,
    name: '',
    dayofWeek: 0,
    // dayofWeekString: null,
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
    // dayofWeekString: string;
    slotStart: moment.Moment;
    slotEnd: moment.Moment;
    slotDate: moment.Moment;
    scheduleStatus: number;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }

}