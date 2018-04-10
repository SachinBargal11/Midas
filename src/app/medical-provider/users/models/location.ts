import * as moment from 'moment';
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
    updateDate: null,
    companyId: 0,
});

export class Location extends LocationRecord {

    id: number;
    name: string;
    locationType: LocationType;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;
    companyId: number;

    constructor(props) {
        super(props);
    }

}