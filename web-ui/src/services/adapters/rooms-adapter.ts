import {Room} from '../../models/room';


export class RoomsAdapter {
    static parseResponse(roomsData: any): Room {

        let room = null;
        if (roomsData) {
            room = new Room({
                    id: roomsData.id,
                    name: roomsData.name,
                    contactPersonName: roomsData.contactersonName,
                    phone: roomsData.phone,
                    roomTest: roomsData.roomTest,
                    location: roomsData.location
            });
        }
        return room;
    }
}