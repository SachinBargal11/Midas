import { Room } from '../../models/room';
import { TestsAdapter } from './tests-adapter';
import { LocationDetailAdapter } from '../../../locations/services/adapters/location-detail-adapter';


export class RoomsAdapter {
    static parseResponse(roomsData: any): Room {

        let room = null;
        if (roomsData) {
            room = new Room({
                id: roomsData.id,
                name: roomsData.name,
                contactPersonName: roomsData.contactersonName,
                phone: roomsData.phone,
                roomTest: TestsAdapter.parseResponse(roomsData.roomTest),
                location: LocationDetailAdapter.parseResponse(roomsData.location),
                schedule: roomsData.schedule,
                isDeleted: roomsData.isDeleted
            });
        }
        return room;
    }
}