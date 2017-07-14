import { Record } from 'immutable';
import * as moment from 'moment';
import { Document } from '../../../commons/models/document';
import { Company } from '../../../account/models/company';

const CaseDocumentRecord = Record({
    caseId: 0,
    document: null,
    companies: null
});

export class CaseDocument extends CaseDocumentRecord {

    caseId: number;
    document: Document;
    companies: Company[];

    constructor(props) {
        super(props);
    }

}