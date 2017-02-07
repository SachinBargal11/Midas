import * as moment from 'moment';
import { Record } from 'immutable';
import { Employer } from './employer';
import { Insurance } from './insurance';
import { Accident } from './accident';
import { User } from '../../../commons/models/user';
import { MaritalStatus } from './enums/marital-status';


// export interface IPatient {
//     id: number;
//     user: User;
//     ssn: string;
//     wcbNo: string;
//     weight: number;
//     maritalStatusId: MaritalStatus;
//     drivingLicence: string;
//     emergencyContactName: string;
//     emergencyContactRelation: string;
//     emergencyContactNumber: string;
//     isDeleted: boolean;
//     createByUserID: number;
//     createDate: moment.Moment;
//     updateByUserID: number;
//     updateDate: moment.Moment;

// }

const PatientRecord = Record({
    id: 0,
    user: null,
    employer: null,
    insurance: null,
    accident: null,
    ssn: '',
    wcbNo: '',
    weight: 0,
    maritalStatusId: MaritalStatus.SINGLE,
    drivingLicence: '',
    emergencyContactName: '',
    emergencyContactRelation: '',
    emergencyContactNumber: '',
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null
});

export class Patient extends PatientRecord {

    id: number;
    user: User;
    employer: Employer;
    insurance: Insurance;
    accident: Accident;
    ssn: string;
    wcbNo: string;
    weight: number;
    maritalStatusId: MaritalStatus;
    drivingLicence: string;
    emergencyContactName: string;
    emergencyContactRelation: string;
    emergencyContactNumber: string;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }

    // get id(): number {
    //     return this.user.id;
    // }

}