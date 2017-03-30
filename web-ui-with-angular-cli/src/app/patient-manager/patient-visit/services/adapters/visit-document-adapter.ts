import * as moment from 'moment';
import { VisitDocument } from '../../models/visit-document';

export class VisitDocumentAdapter {
    static parseResponse(data: any): VisitDocument {

        let visitDocument = null;

        visitDocument = new VisitDocument({
            id: data.id,
            visitId: data.id,
            documentPath: data.documentPath,
            documentName: data.documentName,
            status: data.status,
            message: data.message,
            createByUserID: data.createbyuserID,
            createDate: data.createDate ? moment.utc(data.createDate) : null,
            updateByUserID: data.updateByUserID,
            updateDate: data.updateDate ? moment.utc(data.updateDate) : null
        });

        return visitDocument;
    }
}
