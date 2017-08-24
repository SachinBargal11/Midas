import { Record } from 'immutable';
import * as moment from 'moment';

const SchoolRecord = Record({
    id: 0,
    caseId: 0,
    nameOfSchool: '',
    grade: '',
    lossOfTime: false,
    datesOutOfSchool: '',
    isDeleted: false,
    createByUserID: 0,
    createDate: moment(),
    updateByUserID: null,
    updateDate: null
});

export class School extends SchoolRecord {

    id: number;
    caseId: number;
    nameOfSchool: string;
    grade: string;
    lossOfTime: boolean;
    datesOutOfSchool: string;
    isDeleted: false;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment

    constructor(props) {
        super(props);
    }

}