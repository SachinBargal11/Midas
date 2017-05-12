import { Record } from 'immutable';
import * as moment from 'moment';
import { MidasDocument } from './midas-document';

const ReferralDocumentRecord = Record({
    id: 0,
    referralId: 0,
    midasDocumentId: 0,
    documentName:'',
    midasDocument: null,
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null
});

export class ReferralDocument extends ReferralDocumentRecord {

    id: number;
    referralId: number;
    midasDocumentId: number;
    documentName:string;
    midasDocument: MidasDocument;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }

}