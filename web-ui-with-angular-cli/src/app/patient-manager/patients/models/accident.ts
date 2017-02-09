import { Record } from 'immutable';
import * as moment from 'moment';
import { Address } from '../../../commons/models/address';

const AccidentRecord = Record({
    id: 0,
    patientId: 0,
    address: null,
    accidentDate: 0,
    plateNumber: '',
    reportNumber: 0,
    hospitalName: '',
    hospitalAddress: '',
    injuryDescription: '',
    dateOfAdmission: moment(),
    patientType: 0,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null
});

export class Accident extends AccidentRecord {

    id: number;
    address: Address;
    accidentDate: number;
    plateNumber: string;
    reportNumber: string;
    hospitalName: string;
    hospitalAddress: string;
    injuryDescription: string;
    dateOfAdmission: moment.Moment;
    patientType: number;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }

}