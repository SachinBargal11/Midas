import { Record } from 'immutable';
import * as moment from 'moment';
import { Tests } from '../../rooms/models/tests';

const DoctorTestSpecialityRecord = Record({
    id: 0,
    testSpeciality: null,
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, //Moment
    updateDate: null //Moment
});

export class DoctorTestSpeciality extends DoctorTestSpecialityRecord {

    id: number;
    testSpeciality: Tests;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }

}
