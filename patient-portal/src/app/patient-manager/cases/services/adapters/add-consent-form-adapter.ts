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
                doctorId: data.doctorId,
                consentReceived: data.consentReceived,
                //accidentAddress: AddressAdapter.parseResponse(data.accidentAddressInfo),
                status: data.status,
                message: data.message,
                createByUserID: data.createbyuserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateByUserID: data.updateByUserID,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null
            });
        }
        return addConsent;
    }
}
