// import {Moment} from 'moment';
// export interface Patient {

//     id?: number;
//     firstname: string;
//     lastname: string;
//     email: string;
//     mobileNo: string;
//     address: string;
//     dob: Date;
// }


import {Record} from 'immutable';
import Moment from 'moment';

const PatientRecord = Record({
    id: 0,
    name: '',
    firstname: '',
    lastname: '',
    email: '',
    mobileNo: '',
    address: '',
    status: '',
    caseId: '',
    createdUser: 0
});

export class Patient extends PatientRecord {

    id: number;
    name: string;
    firstname: string;
    lastname: string;
    email: string;
    mobileNo: string;
    address: string;
    status: string;
    caseId: string;
    createdUser: number;

    constructor(props) {
        super(props);
    }

}