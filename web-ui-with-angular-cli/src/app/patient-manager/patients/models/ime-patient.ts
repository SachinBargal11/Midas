import { Record } from 'immutable';
import * as moment from 'moment';

const ImePatientRecord = Record({

    id: 0,
    patientId: 0,
    caseId: 0,
    caseAndPatientName: '',
});

export class ImePatient extends ImePatientRecord {


    id: number;
    patientId: number;
    caseId: number;
    caseAndPatientName: string;

    constructor(props) {
        super(props);
    }

}