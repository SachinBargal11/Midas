import * as moment from 'moment';
import * as _ from 'underscore';
import { PrefferedProvider } from '../../../account-setup/models/preffered-provider';
import { AddressAdapter } from '../../../commons/services/adapters/address-adapter';
import { ContactAdapter } from '../../../commons/services/adapters/contact-adapter';


export class PrefferedProviderAdapter {
    static parseResponse(providerData: any): PrefferedProvider {
       
        let prefferedProvider: PrefferedProvider = null;

        if (providerData) {
            prefferedProvider = new PrefferedProvider({
                id: providerData.id,
                status: providerData.status,
                name: providerData.name,
                companyType: providerData.companyType,
                subscriptionType: providerData.subscriptionType,
                taxId: providerData.taxId,
                addressInfo: providerData.addressInfo,
                contactInfo: providerData.contactInfo,
                location: providerData.location,
                registrationComplete: providerData.registrationComplete,
                invitationID: providerData.invitationID,
                isDeleted: providerData.isDeleted,
                contact: ContactAdapter.parseResponse(providerData.contactInfo),
                address: AddressAdapter.parseResponse(providerData.addressInfo)
            });
        }
        return prefferedProvider;
    }

}