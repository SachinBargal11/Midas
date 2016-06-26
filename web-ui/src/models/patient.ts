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
    firstname: "",
    lastname: "",
    email: "",
    mobileNo: "",
    address: "",
    dob: Moment(),
    createdUser: 0
});

export class Patient extends PatientRecord {

    id: number;
    firstname: string;
    lastname: string;
    email: string;
    mobileNo: string;
    address: string;
    dob: Date;
    createdUser: number

    constructor(props) {
        super(props);
    }

}