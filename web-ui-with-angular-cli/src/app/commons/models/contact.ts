import {Record} from 'immutable';
import * as moment from 'moment';

const ContactRecord = Record({
    id: 0,
    name: '',
    cellPhone: '',
    emailAddress: '',
    homePhone: '',
    workPhone: '',
    faxNo: '',
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, //Moment
    updateDate: null, //Moment
    alternateEmail: '',
    officeExtension: '',
    preferredcommunication: '',

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
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;
    alternateEmail: string;
    officeExtension: string;
    preferredcommunication: string

    constructor(props) {
        super(props);
    }
}