import { Record } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';
import { AvailableSingleSlot } from './available-single-slot';


const AvailableSlotRecord = Record({
    forDate: null,
    startAndEndTimes: []
});

export class AvailableSlot extends AvailableSlotRecord {

    forDate: moment.Moment;
    startAndEndTimes: AvailableSingleSlot[]

    constructor(props) {
        super(props);
    }
}




