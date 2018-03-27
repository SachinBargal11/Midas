import * as moment from 'moment';
import { InsuranceMaster } from '../../models/insurance-master';
import { InsuranceAddressAdapter } from '../../../../commons/services/adapters/insurance-address-adapter';
import { ContactAdapter } from '../../../../commons/services/adapters/contact-adapter';
import { AdjusterAdapter } from '../../../../account-setup/services/adapters/adjuster-adapter';

export class InsuranceMasterAdapter {
    static parseResponse(data: any): InsuranceMaster {

        let insuranceMaster = null;
        if (data) {
            insuranceMaster = new InsuranceMaster({
                id: data.id,
                companyCode: data.companyCode,
                companyName: data.companyName,
                adjusterMasters: AdjusterAdapter.parseResponse(data.adjusterMasters),
                Contact: ContactAdapter.parseResponse(data.contactInfo),
                InsuranceAddress: data.insuranceAddressInfo,
                Only1500Form: data.only1500Form,
                paperAuthorization: data.paperAuthorization,
                priorityBilling: data.priorityBilling,
                zeusID: data.zeusID,
                createdByCompanyId: data.createdByCompanyId,
                insuranceMasterTypeId : data.insuranceMasterTypeId
            });
        }
        return insuranceMaster;
    }
}
