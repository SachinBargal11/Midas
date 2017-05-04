import { Record } from 'immutable';
import * as moment from 'moment';
import { User } from '../../commons/models/user';
import { Company } from '../../account/models/company';
import { PrefferedProvider } from '../../account-setup/models/preffered-provider';


const MedicalProviderMasterRecord = Record({
    id: 0,
    companyId: 0,
    prefMedProviderId: null,
    company: null,
    prefferedProvider: null,
    isCreated: null,
});

export class MedicalProviderMaster extends MedicalProviderMasterRecord {

    id: number;
    companyId: number;
    prefMedProviderId: number;
    company: Company;
    prefferedProvider: PrefferedProvider;
    isCreated: boolean;
    constructor(props) {
        super(props);
    }
}