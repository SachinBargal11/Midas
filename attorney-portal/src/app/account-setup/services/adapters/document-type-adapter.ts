import * as moment from 'moment';
import { DocumentType } from '../../models/document-type'


export class DocumentTypeAdapter {
    static parseResponse(data: any): DocumentType {

        let documentType: DocumentType = null;
        if (data) {
            documentType = new DocumentType({
                id: 0,
                objectType: data.objectType,
                documentType: data.documentType,
                companyId: data.companyid,
                isCustomType: data.isCustomType,
                invitationID: 0,
                isDeleted: data.isDeleted ? true : false,
                updateByUserID: data.updateByUserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null

            });
        }
        return documentType;
    }
}