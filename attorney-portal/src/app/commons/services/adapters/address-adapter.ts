import * as moment from 'moment';
import { Address } from '../../models/address';

export class AddressAdapter {
    static parseResponse(addressData: any): Address {

        let address = null;
        if (addressData) {
            address = new Address({
                id: addressData.id,
                name: addressData.name,
                address1: addressData.address1,
                address2: addressData.address2,
                city: addressData.city,
                state: addressData.state,
                zipCode: addressData.zipCode,
                country: addressData.country,
                isDeleted: addressData.isDeleted,
                createByUserId: addressData.createByUserId,
                updateByUserId: addressData.updateByUserId,
                createDate: moment(addressData.createDate), // Moment
                updateDate: moment(addressData.updateDate) // Moment
            });
        }
        return address;
    }
}