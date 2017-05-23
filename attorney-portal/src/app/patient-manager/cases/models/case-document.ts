import { Record } from 'immutable';
import * as moment from 'moment';
import { Document } from '../../../commons/models/document';

const CaseDocumentRecord = Record({
    caseId: 0,
    document: null
});

export class CaseDocument extends CaseDocumentRecord {

    caseId: number;
    document: Document;

    constructor(props) {
        super(props);
    }

}