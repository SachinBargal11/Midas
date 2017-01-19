import {Record} from 'immutable';
import * as moment from 'moment';

const AddressRecord = Record({
    id: 0,
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    isDeleted: 0,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, // Moment
    updateDate: null // Moment
});

export class Address extends AddressRecord {

    id: number;
    name: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }
}