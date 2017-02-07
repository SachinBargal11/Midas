import * as moment from 'moment';
import { Insurance } from '../../models/insurance';
import { AddressAdapter } from '../../../../commons/services/adapters/address-adapter';
import { ContactAdapter } from '../../../../commons/services/adapters/contact-adapter';

export class InsuranceAdapter {
    static parseResponse(data: any): Insurance {

        let insurance = null;
        if (data) {
            insurance = new Insurance({
                id: data.id,
                patientId: data.patientId,
                policyNo: data.policyNo,
                policyHoldersName: data.policyHoldersName,
                isPrimaryInsurance: data.isPrimaryInsurance,
                contact: ContactAdapter.parseResponse(data.contactInfo),
                address: AddressAdapter.parseResponse(data.addressInfo)
            });
        }
        return insurance;
    }
}
