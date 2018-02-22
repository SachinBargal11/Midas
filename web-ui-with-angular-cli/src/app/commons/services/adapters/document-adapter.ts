import * as moment from 'moment';
import { Document } from '../../models/document';

export class DocumentAdapter {
    static parseResponse(data: any): Document {

        let document = null;

        document = new Document({
            id: data.id,
            documentId: data.documentId,            
            documentPath: data.documentPath,
            documentName: data.documentName,
            documentType: data.documentType,
            status: data.status,
            message: data.message,
            createByUserID: data.createbyuserID,
            createDate: data.createDate ? moment.utc(data.createDate) : null,
            updateByUserID: data.updateByUserID,
            updateDate: data.updateDate ? moment.utc(data.updateDate) : null,
            originalResponse: data
        });

        return document;
    }
}
