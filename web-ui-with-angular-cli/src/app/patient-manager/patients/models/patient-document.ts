import { Record } from 'immutable';
import * as moment from 'moment';
import { Document } from '../../../commons/models/document';

const PatientDocumentRecord = Record({
    
    patientId: 0,
    document: null
});

export class PatientDocument extends PatientDocumentRecord {

  
    patientId: number;
    document: Document;
   
    constructor(props) {
        super(props);
    }

}