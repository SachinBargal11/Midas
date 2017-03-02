import { ScheduleAdapter } from '../../../locations/services/adapters/schedule-adapter';
import { LocationDetailAdapter } from '../../services/adapters/location-detail-adapter';
import { DoctorAdapter } from './doctor-adapter';
import { DoctorLocationSchedule } from '../../models/doctor-location-schedule';


export class DoctorLocationScheduleAdapter {
    static parseResponse(data: any): DoctorLocationSchedule {
        let doctorLocationSchedules = null;
        if (data) {
            doctorLocationSchedules = new DoctorLocationSchedule({
                id: data.id,
                doctor: DoctorAdapter.parseResponse(data.doctor),
                location: LocationDetailAdapter.parseResponse(data.location),
                schedule: ScheduleAdapter.parseResponse(data.schedule)
            });
        }
        return doctorLocationSchedules;
    }
}
