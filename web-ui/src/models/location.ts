import moment from 'moment';
import { Record } from 'immutable';
import { LocationType } from './enums/location-type';
import { Address } from './address';
import { Contact } from './contact';


const LocationRecord = Record({
    id: 0,
    name: '',
    address: null,
    contact: null,
    locationType: LocationType.NONE,
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null
});

export class Location extends LocationRecord {

    id: number;
    name: string;
    address: Address;
    contact: Contact;
    locationType: LocationType;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.MomentStatic;
    updateByUserID: number;
    updateDate: moment.MomentStatic;

    constructor(props) {
        super(props);
    }

}