import { Record } from 'immutable';
import * as moment from 'moment';

const DocumentRecord = Record({
    documentId: 0,
    documentPath: '',
    documentName: '',
    documentType: '',
    status: '',
    message: '',
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null,
    originalResponse: null,
    createdCompanyName: '',
    createdUserName: '',
});

export class Document extends DocumentRecord {

    documentId: number;
    documentPath: string;
    documentName: string;
    documentType: string;
    status: string;
    message: string;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;
    originalResponse: any;
    createdCompanyName: string;
    createdUserName: string;

    constructor(props) {
        super(props);
    }

    get formattedCreateDate(): string {
        return Document.getFormattedCreateDate(this.createDate);
    }
    get formattedCreateDateOnly(): string {
        return Document.getFormattedCreateDateOnly(this.createDate);
    }
    static getFormattedCreateDate(date: moment.Moment): string {
        return date.format('MMMM Do YYYY,h:mm:ss a')
    }
    static getFormattedCreateDateOnly(date: moment.Moment): string {
        return date.format('MMMM Do YYYY')
    }
}