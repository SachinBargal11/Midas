import {Record} from 'immutable';
import {Tests} from './tests';
import {Location} from './location';
const RoomRecord = Record({
    id: 0,
    name: '',
    contactPersonName: '',
    phone: '',
    roomTest: null,
    location: null
});

export class Room extends RoomRecord {

    id: number;
    name: string;
    contactPersonName: string;
    phone: string;
    roomTest: Tests;
    location: Location;

    constructor(props) {
        super(props);
    }

}