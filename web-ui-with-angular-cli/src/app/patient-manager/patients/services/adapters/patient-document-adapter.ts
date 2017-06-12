import * as moment from 'moment';
import { PatientDocument } from '../../models/patient-document';
import { DocumentAdapter } from '../../../../commons/services/adapters/document-adapter';

export class PatientDocumentAdapter {
    static parseResponse(data: any): PatientDocument {

        let patientDocument = null;

        patientDocument = new PatientDocument({
            patientId: data.id,
            document: DocumentAdapter.parseResponse(data)
        });

        return patientDocument;
    }
}
