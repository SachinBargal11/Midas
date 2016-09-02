import {Record} from 'immutable';
import moment from 'moment';

const ContactInfoRecord = Record({
    id: 0,
    name: '',
    cellPhone: '',
    emailAddress: '',
    homePhone: '',
    workPhone: '',
    faxNo: '',
    isDeleted: 0,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, //Moment
    updateDate: null //Moment
});

export class ContactInfo extends ContactInfoRecord {

    id: number;
    name: string;
    cellPhone: string;
    emailAddress: string;
    homePhone: string;
    workPhone: string;
    faxNo: string;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.MomentStatic;
    updateDate: moment.MomentStatic;

    constructor(props) {
        super(props);
    }
}