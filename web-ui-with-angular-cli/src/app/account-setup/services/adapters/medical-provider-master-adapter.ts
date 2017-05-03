import * as moment from 'moment';
import { MedicalProviderMaster } from '../../models/medical-provider-master';
import { UserAdapter } from '../../../medical-provider/users/services/adapters/user-adapter';

export class MedicalProviderMasterAdapter {
    static parseResponse(data: any): MedicalProviderMaster {

        let medicalProviderMaster = null;
        if (data) {
            medicalProviderMaster = new MedicalProviderMaster({
                id: data.id,
                name: data.name,
                companyType: data.companyType,
                companyId: data.companyId,
                user: UserAdapter.parseResponse(data.user),

            });
        }
        return medicalProviderMaster;
    }
}