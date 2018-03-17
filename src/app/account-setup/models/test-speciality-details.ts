import { Record } from 'immutable';
import { Tests } from '../../medical-provider/rooms/models/tests';
import { Company } from '../../account/models/company';
import * as moment from 'moment';

const TestSpecialityDetailRecord = Record({
    id: 0,
    roomTest: new Tests({}),
    company: null,
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null,
    showProcCode: true
});

export class TestSpecialityDetail extends TestSpecialityDetailRecord {
    id: number;
    roomTest: Tests;
    company: Company;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;
    showProcCode: boolean;

    constructor(props) {
        super(props);
    }
}