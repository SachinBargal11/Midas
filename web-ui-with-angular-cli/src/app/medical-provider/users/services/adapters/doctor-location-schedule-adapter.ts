import { ScheduleAdapter } from '../../../locations/services/adapters/schedule-adapter';
import { LocationAdapter } from './doctor-location-adapter';
import { DoctorAdapter } from './doctor-adapter';
import { DoctorLocationSchedule } from '../../models/doctor-location-schedule';


export class DoctorLocationScheduleAdapter {
    static parseResponse(data: any): DoctorLocationSchedule {
        let doctorLocationSchedules = null;
        if (data) {
            doctorLocationSchedules = new DoctorLocationSchedule({
                doctor: data.doctor,
                // doctor: DoctorAdapter.parseResponse(data.doctor),
                location: LocationAdapter.parseResponse(data.location),
                schedule: ScheduleAdapter.parseResponse(data.schedule)
            });
        }
        return doctorLocationSchedules;
    }
}
