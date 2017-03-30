import { Record } from 'immutable';
import * as moment from 'moment';

const CaseDocumentRecord = Record({
    id: 0,
    caseId: 0,
    documentPath:'',
    documentName:'',
    status:'',
    message:'',
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null
});

export class CaseDocument extends CaseDocumentRecord {

    id: number;
    caseId: number;
    documentPath:string;
    documentName:string;
    status:string;
    message:string;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }

}