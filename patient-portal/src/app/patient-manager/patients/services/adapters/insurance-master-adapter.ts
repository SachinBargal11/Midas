import * as moment from 'moment';
import { InsuranceMaster } from '../../models/insurance-master';
import { AddressAdapter } from '../../../../commons/services/adapters/address-adapter';
import { ContactAdapter } from '../../../../commons/services/adapters/contact-adapter';
import { AdjusterAdapter } from '../../../patients/services/adapters/adjuster-adapter';

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
                Address: AddressAdapter.parseResponse(data.addressInfo)
            });
        }
        return insuranceMaster;
    }
}
