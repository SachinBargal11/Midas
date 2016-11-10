import {Record} from 'immutable';
const RoomRecord = Record({
    id: 0,
    name: '',
    phone: '',
    testsProvided: ''
});

export class Room extends RoomRecord {

    id: number;
    name: string;
    phone: string;
    testsProvided: string;

    constructor(props) {
        super(props);
    }

}