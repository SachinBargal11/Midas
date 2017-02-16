import * as moment from 'moment';
import { Insurance } from '../../models/insurance';
import { AddressAdapter } from '../../../commons/services/adapters/address-adapter';
import { ContactAdapter } from '../../../commons/services/adapters/contact-adapter';

export class InsuranceAdapter {
    static parseResponse(data: any): Insurance {

        let insurance = null;
        if (data) {
            insurance = new Insurance({
                id: data.id,
                patientId: data.patientId,
                policyNo: data.policyNo,
                policyOwnerId: data.policyOwnerId,
                policyHoldersName: data.policyHoldersName,
                contactPerson: data.contactPerson,
                claimfileNo: data.claimFileNo,
                wcbNo: data.wcbNo,
                insuranceType: data.insuranceTypeId,
                insuranceCompanyCode: data.insuranceCompanyCode,
                isinactive: data.isInActive,
                policyContact: ContactAdapter.parseResponse(data.policyHolderContactInfo),
                policyAddress: AddressAdapter.parseResponse(data.policyHolderAddressInfo),
                insuranceContact: ContactAdapter.parseResponse(data.insuranceCompanyContactInfo),
                insuranceAddress: AddressAdapter.parseResponse(data.insuranceCompanyAddressInfo)
            });
        }
        return insurance;
    }
}
