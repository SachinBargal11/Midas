import {Record} from 'immutable';
import * as moment from 'moment';

const InsuranceAddressRecord = Record({
    id: 0,
    insuranceMasterId: 0,
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    isDefault: false,
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, // Moment
    updateDate: null, // Moment
    recordId: 0,
});

export class InsuranceAddress extends InsuranceAddressRecord {

    id: number;
    insuranceMasterId: number;
    name: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;
    recordId: number;

    constructor(props) {
        super(props);
    }
}