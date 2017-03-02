
import { Record } from 'immutable';
import { Location } from './doctor-location';
import { Schedule } from '../../locations/models/schedule';
import { Doctor } from './doctor';

const DoctorLocationScheduleRecord = Record({
    id: 0,
    doctor: null,
    location: null,
    schedule: null
});

export class DoctorLocationSchedule extends DoctorLocationScheduleRecord {
    id: number;
    doctor: Doctor;
    location: Location;
    schedule: Schedule;

    constructor(props) {
        super(props);
    }

}
