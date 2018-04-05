import { UserLocation } from '../../models/user-location';


export class UserLocationAdapter {
    static parseResponse(locationData: any): UserLocation {
        let userlocation: UserLocation = new UserLocation({
            id: locationData.id,
            name: locationData.name,
            locationType: locationData.locationType,
            isDeleted: locationData.isDeleted ? true : false,

        });
        return userlocation;
    }

}