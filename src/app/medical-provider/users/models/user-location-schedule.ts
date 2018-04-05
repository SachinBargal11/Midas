
import { Record } from 'immutable';
import { LocationDetails } from '../../locations/models/location-details';
import { Schedule } from '../../locations/models/schedule';
import { User } from '../../../commons/models/user';

const UserLocationScheduleRecord = Record({
    id: 0,
    user: null,
    location: null,
    schedule: null
});

export class UserLocationSchedule extends UserLocationScheduleRecord {
    id: number;
    user: User;
    location: LocationDetails;
    schedule: Schedule;

    constructor(props) {
        super(props);
    }

}
