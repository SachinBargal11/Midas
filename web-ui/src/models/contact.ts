import {Record} from 'immutable';
import Moment from 'moment';

const ContactRecord = Record({
    id: 0,
    name: "",
    cellPhone: "",
    emailAddress: "",
    homePhone: "",
    workPhone: "",
    faxNo: "",
    isDeleted: true,
    createByUserID: 0,
    updateByUserID: 0,
    createDate: Moment(),
    updateDate: Moment()
});

export class Contact extends ContactRecord {

    id: number;
    name: string;
    cellPhone: string;
    emailAddress: string;
    homePhone: string;
    workPhone: string;
    faxNo: string;
    isDeleted: boolean;
    createByUserID: number;
    updateByUserID: number;
    createDate: Date;
    updateDate: Date;

    constructor(props) {
        super(props);
    }
}