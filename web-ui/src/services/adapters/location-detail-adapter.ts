import * as moment from 'moment';
import {Location} from '../../models/location';
import {LocationDetails} from '../../models/location-details';
import _ from 'underscore';


export class LocationDetailAdapter {
    static parseResponse(data: any): LocationDetails {

        let locationDetails = null;
        let tempLocation: any = _.omit(data, 'company', 'contactInfo', 'addressInfo');
        if (data) {
            locationDetails = new LocationDetails({
                location: tempLocation,
                company: data.company,
                contact: data.contactInfo,
                address: data.addressInfo
            });
        }
        return locationDetails;
    }


}