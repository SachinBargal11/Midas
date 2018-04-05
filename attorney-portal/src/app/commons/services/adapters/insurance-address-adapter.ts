import * as moment from 'moment';
import { InsuranceAddress } from '../../models/insurance-address';

export class InsuranceAddressAdapter {
    static parseResponse(addressData: any): InsuranceAddress {

        let address = null;
        if (addressData) {
            address = new InsuranceAddress({
                id: addressData.id,
                insuranceMasterId: addressData.insuranceMasterId,
                name: addressData.name,
                address1: addressData.address1,
                address2: addressData.address2,
                city: addressData.city,
                state: addressData.state,
                zipCode: addressData.zipCode,
                country: addressData.country,
                isDefault: addressData.isDefault,
                isDeleted: addressData.isDeleted,
                createByUserId: addressData.createByUserId,
                updateByUserId: addressData.updateByUserId,
                createDate: moment(addressData.createDate), // Moment
                updateDate: moment(addressData.updateDate), // Moment
                recordId: addressData.id
            });
        }
        return address;
    }
}