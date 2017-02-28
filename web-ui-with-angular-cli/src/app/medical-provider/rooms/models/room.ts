import { Record } from 'immutable';
import { Tests } from './tests';
import { Location } from '../../locations/models/location';
import { Schedule } from './rooms-schedule';

const RoomRecord = Record({
    id: 0,
    name: '',
    contactPersonName: '',
    phone: '',
    roomTest: null,
    location: null,
    schedule: null,
    isDeleted: 0
});

export class Room extends RoomRecord {

    id: number;
    name: string;
    contactPersonName: string;
    phone: string;
    roomTest: Tests;
    location: Location;
    schedule: Schedule;
    isDeleted: boolean;

    constructor(props) {
        super(props);
    }

}