import { Record } from 'immutable';
import * as moment from 'moment';

const DocumentTypeRecord = Record({
    id: 0,
    companyId: 0,
    objectType: '',
    documentType: '',
    isCustomType: '',
    invitationID: 0,
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0

});

export class DocumentType extends DocumentTypeRecord {

    id: number;
    companyId: number;
    objectType: string;
    documentType: string;
    isCustomType: string;
    invitationID: number;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;


    constructor(props) {
        super(props);
    }
}
