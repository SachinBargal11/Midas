import * as moment from 'moment';
import { MidasDocument } from '../../models/midas-document';

export class MidasDocumentAdapter {
    static parseResponse(data: any): MidasDocument {

        let midasDocument = null;
        if (data) {
            midasDocument = new MidasDocument({
                id: data.id,
                objectId: data.objectId,
                documentPath: data.documentPath,
                documentName: data.documentName,
                objectType: data.objectType,
                createByUserID: data.createbyuserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateByUserID: data.updateByUserID,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null
            });
        }
        return midasDocument;
    }
}
