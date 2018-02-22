import { Record } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';


const PrefferedProviderRecord = Record({
    id: 0,
    status: null,
    name: "",
    companyType: null,
    subscriptionType: null,
    taxId: null,
    addressInfo: null,
    contactInfo: null,
    location: [],
    registrationComplete: false,
    invitationID: 0,
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0,
    // createDate: null, //Moment
    // updateDate: null //Moment
});

export class PrefferedProvider extends PrefferedProviderRecord {

    id: number;
    status: number;
    name: string;
    companyType: number;
    subscriptionType: number;
    taxId: string;
    addressInfo: string;
    contactInfo: string;
    location: Location[];
    registrationComplete: false;
    invitationID: number;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    // createDate: moment.Moment;
    // updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }
}