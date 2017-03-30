import * as moment from 'moment';
import { AddConsent } from '../../models/add-consent-form';
import { AddressAdapter } from '../../../../commons/services/adapters/address-adapter';

export class AddConsentAdapter {
    static parseResponse(data: any): AddConsent {

        let addConsent = null;
        if (data) {
            addConsent = new AddConsent({
                id: data.id,
                caseId: data.caseId,
                doctorId:data.doctorId,
                consentReceived:'yes'
                //accidentAddress: AddressAdapter.parseResponse(data.accidentAddressInfo),
               
            });
        }
        return addConsent;
    }
}
