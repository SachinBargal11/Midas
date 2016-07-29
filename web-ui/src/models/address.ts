import {Record} from 'immutable';
import moment from 'moment';

const AddressRecord = Record({
    id: 0,
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    isDeleted: 0,
    createByUserID: 0,
    updateByUserID: 0,
    createDate: null, //Moment
    updateDate: null //Moment
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
    createByUserID: number;
    updateByUserID: number;
    createDate: moment.MomentStatic;
    updateDate: moment.MomentStatic;

    constructor(props) {
        super(props);
    }
}