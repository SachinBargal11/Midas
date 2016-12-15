import {Record} from 'immutable';
import moment from 'moment';
import {User} from './user';

const DoctorRecord = Record({
    id: 0,
    licenseNumber: '',
    wcbAuthorization: '',
    wcbRatingCode: '',
    npi: '',
    taxType: '',
    title: '',
    userId: 0,
    user: null,
    isDeleted: 0,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, //Moment
    updateDate: null //Moment
});

export class Doctor extends DoctorRecord {

    id: number;
    licenseNumber: string;
    wcbAuthorization: string;
    wcbRatingCode: string;
    npi: string;
    taxType: string;
    title: string;
    userId: number;
    user: User;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.MomentStatic;
    updateDate: moment.MomentStatic;

    constructor(props) {
        super(props);
    }
}