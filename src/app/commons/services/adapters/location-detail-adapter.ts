import { ScheduleAdapter } from './schedule-adapter';
import { AddressAdapter } from '../adapters/address-adapter';
import { ContactAdapter } from '../adapters/contact-adapter';
// import { CompanyAdapter } from '../adapters/company-adapter';
import { LocationAdapter } from './location-adapter';
import { LocationDetails } from '../../models/location-details';


export class LocationDetailAdapter {
    static parseResponse(data: any): LocationDetails {
        let locationDetails = null;
        if (data) {
            locationDetails = new LocationDetails({
                location: LocationAdapter.parseResponse(data),
                // company: CompanyAdapter.parseResponse(data.company),
                contact: ContactAdapter.parseResponse(data.contactInfo),
                address: AddressAdapter.parseResponse(data.addressInfo),
                schedule: ScheduleAdapter.parseResponse(data.schedule)
            });
        }
        return locationDetails;
    }
}