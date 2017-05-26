import * as moment from 'moment';
import * as _ from 'underscore';
import { PrefferedAttorney } from '../../../account-setup/models/preffered-attorney';
import { AddressAdapter } from '../../../commons/services/adapters/address-adapter';
import { ContactAdapter } from '../../../commons/services/adapters/contact-adapter';


export class PrefferedAttorneyAdapter {
    static parseResponse(attorneyData: any): PrefferedAttorney {
       
        let prefferedAttorney: PrefferedAttorney = null;

        if (attorneyData) {
            prefferedAttorney = new PrefferedAttorney({
                id: attorneyData.id,
                status: attorneyData.status,
                name: attorneyData.name,
                companyType: attorneyData.companyType,
                subscriptionType: attorneyData.subscriptionType,
                taxId: attorneyData.taxId,
                addressInfo: attorneyData.addressInfo,
                contactInfo: attorneyData.contactInfo,
                location: attorneyData.location,
                registrationComplete: attorneyData.registrationComplete,
                invitationID: attorneyData.invitationID,
                isDeleted: attorneyData.isDeleted,
                contact: ContactAdapter.parseResponse(attorneyData.contactInfo),
                address: AddressAdapter.parseResponse(attorneyData.addressInfo)
            });
        }
        return prefferedAttorney;
    }

}