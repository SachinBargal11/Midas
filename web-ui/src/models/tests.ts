import {Record} from 'immutable';
import moment from 'moment';

const TestsRecord = Record({
    id: 0,
    name: '',
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null
});

export class Tests extends TestsRecord {

    id: number;
    name: string;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }

}