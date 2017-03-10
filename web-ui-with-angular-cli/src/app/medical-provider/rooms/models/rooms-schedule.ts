import * as moment from 'moment';
import { Record } from 'immutable';
import { ScheduleDetail } from '../../locations/models/schedule-detail';


const ScheduleRecord = Record({
    id: 0,
    name: '',
    isDefault: false,
    scheduleDetails: null,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null
});

export class Schedule extends ScheduleRecord {

    id: number;
    name: string;
    isDefault: boolean;
    scheduleDetails: ScheduleDetail[];
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }

}