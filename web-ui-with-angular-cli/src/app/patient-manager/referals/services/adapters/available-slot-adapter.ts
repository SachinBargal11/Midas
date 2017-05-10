import { AvailableSingleSlot } from '../../models/available-single-slot';
import * as moment from 'moment';
import * as _ from 'underscore';
import { AvailableSlot } from '../../models/available-slots';


export class AvailableSlotAdapter {
    static parseResponse(data: any): AvailableSlot {

        let availableSlot: AvailableSlot = null;

        if (data) {
            availableSlot = new AvailableSlot({
                forDate: moment(data.forDate),
                startAndEndTimes: AvailableSlotAdapter.parseSingleSlot(data.startAndEndTimes)
            });
        }
        return availableSlot;
    }

    static parseSingleSlot(data: any): AvailableSingleSlot[] {
        let availableSingleSlots: AvailableSingleSlot[] = [];
        _.forEach(data, (currentSlot: any) => {
            availableSingleSlots.push(new AvailableSingleSlot({
                start: moment(currentSlot.startTime),
                end: moment(currentSlot.endTime)
            }));
        });
        return availableSingleSlots;
    }

}

