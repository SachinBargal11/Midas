import * as moment from 'moment';
import { AddConsent } from '../../models/add-consent-form';
import { AddressAdapter } from '../../../../commons/services/adapters/address-adapter';

export class AddConsentAdapter {
    static parseResponse(data: any): AddConsent {

        let AddConsent = null;
        if (data) {
            AddConsent = new AddConsent({
                id: data.id,
                caseId: data.caseId,
                //accidentAddress: AddressAdapter.parseResponse(data.accidentAddressInfo),
               
            });
        }
        return AddConsent;
    }
}
