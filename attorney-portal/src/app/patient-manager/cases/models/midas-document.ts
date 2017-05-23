import { Record } from 'immutable';
import * as moment from 'moment';

const MidasDocumentRecord = Record({
    id: 0,
    objectId: 0,
    documentPath:'',
    documentName:'',
    objectType:'',
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null,
    documentId:0
});

export class MidasDocument extends MidasDocumentRecord {

    id: number;
    objectId: number;
    documentPath:string;
    documentName:string;
    objectType:string;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;
    documentId: number;

    constructor(props) {
        super(props);
    }

}