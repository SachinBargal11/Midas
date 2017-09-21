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
    handicapRamp: 0,
    stairsToOffice: 0,
    publicTransportNearOffice: 0
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
    handicapRamp: boolean;
    stairsToOffice: boolean;
    publicTransportNearOffice: boolean;

    constructor(props) {
        super(props);
    }


    get locationTypeLabel(): string {
        return Location.getLocationTypeLabel(this.locationType);
    }
    // tslint:disable-next-line:member-ordering
    static getLocationTypeLabel(locationType: LocationType): string {
        switch (locationType) {
            case LocationType.MEDICAL_OFFICE:
                return 'Medical office';
            case LocationType.MEDICAL_TESTING_FACILITY:
                return 'Medical testing facility';
        }
    }

}