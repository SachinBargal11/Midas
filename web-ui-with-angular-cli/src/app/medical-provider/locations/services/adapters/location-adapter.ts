import { Location } from '../../models/location';


export class LocationAdapter {
    static parseResponse(locationData: any): Location {
        let location: Location = new Location({
            id: locationData.id,
            name: locationData.name,
            locationType: locationData.locationType,
            handicapRamp:locationData.handicapRamp ? 1 : 0,
            stairsToOffice:locationData.stairsToOffice ? 1 : 0,
            publicTransportNearOffice:locationData.publicTransportNearOffice ? 1 : 0,
            isDeleted: locationData.isDeleted ? true : false,

        });
        return location;
    }

}