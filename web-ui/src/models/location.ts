import moment from 'moment';
import { Record } from 'immutable';
import { LocationType } from './enums/location-type';


const LocationRecord = Record({
    id: 0,
    name: '',
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