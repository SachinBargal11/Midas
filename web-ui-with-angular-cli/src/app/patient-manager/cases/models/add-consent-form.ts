import { Record } from 'immutable';
import * as moment from 'moment';
import { Address } from '../../../commons/models/address';
import { Case } from './case';
import { Company } from '../../../account/models/company';


const ConsentForm = Record({
    id: 0,
    caseId: 0,
    doctorId: 0,
    patientId: 0,
    consentReceived: '',
    companyId:0,
    documentName: '',
    documentId: '',
    case:null,
    company:null,
});

export class AddConsent extends ConsentForm {

    id: number;
    caseId: number;
    doctorId: number;
    patientId: number;
    consentReceived: string;
    companyId:number;
    documentName: string;
    documentId: number;
    case:Case;
    Company:Company;

    constructor(props) {
        super(props);
    }

}