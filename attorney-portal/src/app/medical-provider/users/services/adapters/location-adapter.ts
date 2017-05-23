import { Location } from '../../models/location';


export class LocationAdapter {
    static parseResponse(locationData: any): Location {
        let location: Location = new Location({
            id: locationData.id,
            name: locationData.name,
            locationType: locationData.locationType,
            isDeleted: locationData.isDeleted ? true : false,

        });
        return location;
    }

}