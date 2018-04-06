import { ScheduleAdapter } from '../../../locations/services/adapters/schedule-adapter';
import { LocationDetailAdapter } from '../../services/adapters/location-detail-adapter';
import { UserAdapter } from './user-adapter';
import { UserLocationSchedule } from '../../models/user-location-schedule';


export class UserLocationScheduleAdapter {
    static parseResponse(data: any): UserLocationSchedule {
        let userLocationSchedules = null;
        if (data) {
            userLocationSchedules = new UserLocationSchedule({
                id: data.id,
                user: UserAdapter.parseResponse(data.user),
                location: LocationDetailAdapter.parseResponse(data.location),
                schedule: ScheduleAdapter.parseResponse(data.schedule)
            });
        }
        return userLocationSchedules;
    }
}
