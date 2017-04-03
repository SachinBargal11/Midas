import { Record } from 'immutable';
import * as moment from 'moment';
import { Address } from '../../../commons/models/address';


const ConsentForm = Record({
    id: 0,
    caseId: 0,
    doctorId: 0,
    patientId: 0,
    consentReceived: ''
});

export class AddConsent extends ConsentForm {

    id: number;
    caseId: number;
    doctorId: number;
    patientId: number;
    consentReceived: string;

    

    constructor(props) {
        super(props);
    }

}