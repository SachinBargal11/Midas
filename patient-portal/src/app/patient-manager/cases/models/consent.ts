import { Record } from 'immutable';
import * as moment from 'moment';
import { Case } from './case';
import { Company } from '../../../account/models/company';


const AddConsent = Record({
    id: 0,
    caseId: 0,
    doctorId: 0,
    patientId: 0,
    consentReceived: '',
    companyId: 0,
    documentName: '',
    documentId: '',
    case: null,
    company: null,
    documentPath: '',
    status: '',
    message: '',
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null,
    Path: ''
   

});
 //testt
export class Consent extends AddConsent {

    id: number;
    caseId: number;
    doctorId: number;
    patientId: number;
    consentReceived: string;
    companyId: number;
    documentName: string;
    documentId: number;
    case: Case;
    Company: Company;
    documentPath: string;
    status: string;
    message: string;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;
     Path: string;

    constructor(props) {
        super(props);
    }

}