import * as moment from 'moment';
import { CaseDocument } from '../../models/case-document';

export class CaseDocumentAdapter {
    static parseResponse(data: any): CaseDocument {

        let caseDocument = null;

        caseDocument = new CaseDocument({
            id: data.id,
            caseId: data.id,
            documentPath: data.documentPath,
            documentName: data.documentName,
            status: data.status,
            message: data.message,
            createByUserID: data.createbyuserID,
            createDate: data.createDate ? moment.utc(data.createDate) : null,
            updateByUserID: data.updateByUserID,
            updateDate: data.updateDate ? moment.utc(data.updateDate) : null
        });

        return caseDocument;
    }
}
 