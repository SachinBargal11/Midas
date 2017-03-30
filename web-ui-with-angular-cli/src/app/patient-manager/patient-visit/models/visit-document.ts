import { Record } from 'immutable';
import * as moment from 'moment';

const VisitDocumentRecord = Record({
    id: 0,
    visitId: 0,
    fileUploadPath:'',
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null
});

export class VisitDocument extends VisitDocumentRecord {

    id: number;
    visitId: number;
    fileUploadPath:string;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }
 
}