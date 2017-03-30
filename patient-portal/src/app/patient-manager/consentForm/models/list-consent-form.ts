import { Record } from 'immutable';
import * as moment from 'moment';
import { Address } from '../../../commons/models/address';


const ListConsentForm = Record({
    id: 0,
    caseId: 0,
    doctorId: 0,
    patientId: 0,
    consentReceived: '',
    Path:''
});

export class ListConsent extends ListConsentForm {

    id: number;
    caseId: number;
    doctorId: number;
    patientId: number;
    consentReceived: string;
Path:string;
    constructor(props) {
        super(props);
    }

}