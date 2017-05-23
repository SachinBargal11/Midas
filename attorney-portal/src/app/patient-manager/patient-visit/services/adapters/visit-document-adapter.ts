import * as moment from 'moment';
import { VisitDocument } from '../../models/visit-document';
import { DocumentAdapter } from '../../../../commons/services/adapters/document-adapter';

export class VisitDocumentAdapter {
    static parseResponse(data: any): VisitDocument {

        let visitDocument = null;

        visitDocument = new VisitDocument({
            visitId: data.id,
            document: DocumentAdapter.parseResponse(data)
        });

        return visitDocument;
    }
}
