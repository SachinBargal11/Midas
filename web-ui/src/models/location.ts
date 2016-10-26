import {Record} from 'immutable';
const LocationRecord = Record({
    id: 0,
    name: '',
    address: '',
    phone: ''
});

export class Location extends LocationRecord {

    id: number;
    name: string;
    address: string;
    phone: string;

    constructor(props) {
        super(props);
    }

}