import moment from 'moment';
import { Record } from 'immutable';


const ScheduleDetailsRecord = Record({
    id: 0,
    name: '',
    dayofWeek: 0,
    slotStart: '',
    slotEnd: '',
    slotDate: '',
    scheduleStatus: 0,
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null
});

export class ScheduleDetails extends ScheduleDetailsRecord {

    id: number;
    name: string;
    dayofWeek: number;
    slotStart: string;
    slotEnd: string;
    slotDate: string;
    scheduleStatus: number;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.MomentStatic;
    updateByUserID: number;
    updateDate: moment.MomentStatic;

    constructor(props) {
        super(props);
    }

}