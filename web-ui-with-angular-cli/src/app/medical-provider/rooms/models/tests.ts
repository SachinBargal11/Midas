import {Record} from 'immutable';
import * as moment from 'moment';

const TestsRecord = Record({
    id: 0,
    name: '',
    color: '',
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null
});

export class Tests extends TestsRecord {

    id: number;
    name: string;
    color: string;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }

}