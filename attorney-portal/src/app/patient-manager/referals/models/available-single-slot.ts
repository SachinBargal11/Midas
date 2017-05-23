import { Record } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';


const AvailableSingleSlotRecord = Record({
    start: null,
    end: null
});

export class AvailableSingleSlot extends AvailableSingleSlotRecord {

    start: moment.Moment;
    end: moment.Moment;

    constructor(props) {
        super(props);
    }
}




