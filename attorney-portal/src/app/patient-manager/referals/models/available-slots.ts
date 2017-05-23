import { Record } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';
import { AvailableSingleSlot } from './available-single-slot';


const AvailableSlotRecord = Record({
    forDate: null,
    startEndTimes: []
});

export class AvailableSlot extends AvailableSlotRecord {

    forDate: moment.Moment;
    startEndTimes: AvailableSingleSlot[]

    constructor(props) {
        super(props);
    }
}




