import { Record } from 'immutable';
import * as moment from 'moment';
import { Document } from '../../../commons/models/document';

const VisitDocumentRecord = Record({
    visitId: 0,
    document: null
});

export class VisitDocument extends VisitDocumentRecord {

    visitId: number;
    document: Document;

    constructor(props) {
        super(props);
    }

}