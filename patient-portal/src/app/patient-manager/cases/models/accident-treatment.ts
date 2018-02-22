import { Record } from 'immutable';
import * as moment from 'moment';

const AccidentTreatmentRecord = Record({
    id: 0,
    patientAccidentInfoId: 0,
    medicalFacilityName: '',
    doctorName: '',
    contactNumber: '',
    address: '',
    isDeleted: false
});

export class AccidentTreatment extends AccidentTreatmentRecord {

    id: number;
    patientAccidentInfoId: number;
    medicalFacilityName: string;
    doctorName: string;
    contactNumber: string;
    address: string;
    isDeleted: boolean;

    constructor(props) {
        super(props);
    }

}

