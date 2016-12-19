import moment from 'moment';
import { Schedule } from '../../models/schedule';
import { ScheduleDetail } from '../../models/schedule-detail';


export class ScheduleAdapter {
    static parseResponse(scheduleData: any): Schedule {
        let schedule = null;
        let scheduleDetails: ScheduleDetail[] = [];
        if (scheduleData) {
            if (scheduleData.scheduleDetails) {
                for (let scheduleDetail of scheduleData.scheduleDetails) {
                    scheduleDetails.push(ScheduleAdapter.parseScheduleDetails(scheduleDetail).toJS());
                }
            }
            schedule = new Schedule({
                id: scheduleData.id,
                name: scheduleData.name,
                scheduleDetails: scheduleDetails
            });
        }
        return schedule;
    }

    static parseScheduleDetails(scheduleDetail: any): ScheduleDetail {
        let sd = new ScheduleDetail({
            id: scheduleDetail.id,
            name: scheduleDetail.name,
            dayofWeek: moment().weekday(scheduleDetail.dayofWeek - 1),
            // dayofWeekString: moment().weekday(scheduleDetail.dayofWeek - 1),
            slotStart: moment(scheduleDetail.slotStart, 'hh:mm:ss').toDate(),
            slotEnd: moment(scheduleDetail.slotEnd, 'hh:mm:ss').toDate(),
            slotDate: scheduleDetail.slotDate,
            scheduleStatus: scheduleDetail.scheduleStatus,
            isDeleted: scheduleDetail.isDeleted,
            createByUserID: scheduleDetail.createByUserID,
            createDate: scheduleDetail.createDate,
            updateByUserID: scheduleDetail.updateByUserID,
            updateDate: scheduleDetail.updateDate
        });
        return sd;
    }
}