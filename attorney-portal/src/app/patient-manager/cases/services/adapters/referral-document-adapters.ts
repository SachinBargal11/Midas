import * as moment from 'moment';
import { ReferralDocument } from '../../models/referral-document';
import { MidasDocumentAdapter } from './midas-document-adapters';

export class ReferralDocumentAdapter {
    static parseResponse(data: any): ReferralDocument {

        let referralDocument = null;

        if (data) {
            referralDocument = new ReferralDocument({
                id: data.id,
                referralId: data.referralId,
                midasDocumentId: data.midasDocumentId,
                documentName: data.documentName,
                midasDocument: MidasDocumentAdapter.parseResponse(data.midasDocument),
                createByUserID: data.createbyuserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateByUserID: data.updateByUserID,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null
            });
        }
        return referralDocument;
    }
}
