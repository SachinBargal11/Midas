import * as moment from 'moment';
import { AncillaryMaster } from '../../models/ancillary-master';
import { UserAdapter } from '../../../medical-provider/users/services/adapters/user-adapter';
import { PrefferedProviderAdapter } from '../../../account-setup/services/adapters/preffered-provider-adapter';
import { CompanyAdapter } from '../../../account/services/adapters/company-adapter';
import { SignupAdapter } from '../../../account-setup/services/adapters/signup-adapter';

export class AncillaryMasterAdapter {
    static parseResponse(data: any): AncillaryMaster {

        let ancillaryMaster = null;
        if (data) {
            ancillaryMaster = new AncillaryMaster({
                id: data.id,
                companyId: data.companyId,
                prefMedProviderId: data.prefMedProviderId,
                company: CompanyAdapter.parseResponse(data.company),
                prefferedProvider: PrefferedProviderAdapter.parseResponse(data.prefMedProvider),
                isCreated: data.isCreated,
                signup: SignupAdapter.parseResponse(data.signup),
            });
        }
        return ancillaryMaster;
    }
}