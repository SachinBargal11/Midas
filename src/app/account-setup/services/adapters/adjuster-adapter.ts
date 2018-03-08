import * as moment from 'moment';
import { Adjuster } from '../../models/adjuster';
import { AddressAdapter } from '../../../commons/services/adapters/address-adapter';
import { ContactAdapter } from '../../../commons/services/adapters/contact-adapter';

export class AdjusterAdapter {
    static parseResponse(data: any): Adjuster {

        let adjuster = null;
        if (data) {
            adjuster = new Adjuster({
                id: data.id,
                companyId: data.companyId,
                insuranceMasterId: data.insuranceMasterId,
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                adjusterContact: ContactAdapter.parseResponse(data.contactInfo),
                adjusterAddress: AddressAdapter.parseResponse(data.addressInfo),

            });
        }
        return adjuster;
    }
}
