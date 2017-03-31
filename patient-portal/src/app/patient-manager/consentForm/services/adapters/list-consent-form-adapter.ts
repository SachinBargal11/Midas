import * as moment from 'moment';
import { ListConsent } from '../../models/list-consent-form';
import { AddressAdapter } from '../../../../commons/services/adapters/address-adapter';

export class ListConsentAdapter {
    static parseResponse(data: any): ListConsent {

        let listConsent = null;
        if (data) {
            listConsent = new ListConsent({
                id: data.id,
                caseId: data.caseId,
                doctorId:data.doctorId,
                consentReceived:'yes',
                path:data.path
                //accidentAddress: AddressAdapter.parseResponse(data.accidentAddressInfo),
               
            });
        }
        return listConsent;
    }
}
