import { DocumentAdapter } from '../../../../commons/services/adapters/document-adapter';
import { CaseDocument } from '../../models/case-document';
import * as moment from 'moment';

export class CaseDocumentAdapter {
    static parseResponse(data: any): CaseDocument {
        debugger;
        let caseDocument = null;

        caseDocument = new CaseDocument({
            caseId: data.id,
            document: DocumentAdapter.parseResponse(data)
        });

        return caseDocument;
    }
}
 