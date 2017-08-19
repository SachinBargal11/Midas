import * as moment from 'moment';
import { Insurance } from '../../models/insurance';
import { AddressAdapter } from '../../../../commons/services/adapters/address-adapter';
import { ContactAdapter } from '../../../../commons/services/adapters/contact-adapter';
import { InsuranceMasterAdapter } from './insurance-master-adapter';

export class InsuranceAdapter {
    static parseResponse(data: any): Insurance {

        let insurance = null;
        if (data) {
            insurance = new Insurance({
                id: data.id,
                caseId: data.caseId,
                policyNo: data.policyNo,
                policyOwnerId: data.policyOwnerId,
                policyHoldersName: data.policyHoldersName,
                contactPerson: data.contactPerson,
                insuranceType: data.insuranceTypeId,
                insuranceMasterId: data.insuranceMasterId,
                insuranceMaster: InsuranceMasterAdapter.parseResponse(data.insuranceMaster),
                insuranceCompanyCode: data.insuranceCompanyCode,
                caseInsuranceMapping: data.caseInsuranceMapping,
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
