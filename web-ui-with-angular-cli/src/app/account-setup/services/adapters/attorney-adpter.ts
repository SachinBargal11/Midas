import * as moment from 'moment';
import { Attorney } from '../../models/attorney';
import { UserAdapter } from '../../../medical-provider/users/services/adapters/user-adapter';
import { PrefferedAttorneyAdapter } from '../../../account-setup/services/adapters/preffered-attorney-adapter';
import { CompanyAdapter } from '../../../account/services/adapters/company-adapter';
import { SignupAdapter } from '../../../account-setup/services/adapters/signup-adapter';


export class AttorneyAdapter {
    static parseResponse(data: any): Attorney {

        let attorney = null;
        if (data) {
            attorney = new Attorney({
                id: data.id,
                companyId: data.companyId,
                // PrefAttorneyProviderId: data.PrefAttorneyProviderId,
                company: CompanyAdapter.parseResponse(data.company),
                prefferedAttorney: PrefferedAttorneyAdapter.parseResponse(data.prefAttorneyProvider),
                isCreated: data.isCreated,
                signup: SignupAdapter.parseResponse(data.signup),
            });
        }
        return attorney;
    }
}