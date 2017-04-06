import { Record } from 'immutable';
import * as moment from 'moment';
import { Speciality } from '../../../account-setup/models/speciality';

const DoctorSpecialityRecord = Record({
    id: 0,
    speciality: null,
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, //Moment
    updateDate: null //Moment
});

export class DoctorSpeciality extends DoctorSpecialityRecord {

    id: number;
    speciality: Speciality;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }

}
