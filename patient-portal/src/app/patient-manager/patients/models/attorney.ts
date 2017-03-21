import * as moment from 'moment';
import { Record } from 'immutable';

const AttorneyRecord = Record({
    id: 0,
    attorney: ''
});

export class Attorney extends AttorneyRecord {

    id: number;
    attorney: string;


    constructor(props) {
        super(props);
    }
}
