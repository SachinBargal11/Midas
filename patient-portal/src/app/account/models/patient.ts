import * as moment from 'moment';
import { Record } from 'immutable';
import { Employer } from './employer';
import { Insurance } from './insurance';
import { Accident } from './accident';
import { User } from '../../commons/models/user';
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
    companyId: 0,
    ssn: '',
    weight: 0,
    height: 0,
    maritalStatusId: MaritalStatus.SINGLE,
    dateOfFirstTreatment: null,
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
    companyId: number;
    ssn: string;
    weight: number;
    height: number;
    maritalStatusId: MaritalStatus;
    dateOfFirstTreatment: moment.Moment;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }
    get maritalStatusLabel(): string {
        return Patient.getLabel(this.maritalStatusId);
    }
    // tslint:disable-next-line:member-ordering
    static getLabel(maritalStatus: MaritalStatus): string {
        switch (maritalStatus) {
            case MaritalStatus.SINGLE:
                return 'Single';
            case MaritalStatus.MARRIED:
                return 'Married';
        }
    }
}
