import * as moment from 'moment';
import { Record } from 'immutable';
import { LocationType } from './enums/location-type';


const UserLocationRecord = Record({
    id: 0,
    name: '',
    locationType: LocationType.NONE,
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null
});

export class UserLocation extends UserLocationRecord {

    id: number;
    name: string;
    locationType: LocationType;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }

}