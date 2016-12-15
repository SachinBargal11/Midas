import moment from 'moment';
import { Record } from 'immutable';
import { LocationType } from './enums/location-type';
import { ScheduleDetails } from './schedule-details';


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
    scheduleDetails: ScheduleDetails;
    createByUserID: number;
    createDate: moment.MomentStatic;
    updateByUserID: number;
    updateDate: moment.MomentStatic;

    constructor(props) {
        super(props);
    }

}