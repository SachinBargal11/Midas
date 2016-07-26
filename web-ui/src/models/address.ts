import {Record} from 'immutable';
import Moment from 'moment';

const AddressRecord = Record({
    id: 0,
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    isDeleted: true,
    createByUserID: 0,
    updateByUserID: 0,
    createDate: Moment(),
    updateDate: Moment()
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
    createDate: Date;
    updateDate: Date;

    constructor(props) {
        super(props);
    }
}