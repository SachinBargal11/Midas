import { Record } from 'immutable';
import * as moment from 'moment';
import { User } from '../../commons/models/user';
import { Company } from '../../account/models/company';
import { PrefferedProvider } from '../../account-setup/models/preffered-provider';
import { Signup } from '../../account-setup/models/signup';

const MedicalProviderMasterRecord = Record({
    id: 0,
    companyId: 0,
    prefMedProviderId: null,
    company: null,
    signup: null,
    prefferedProvider: null,
    isCreated: null,

});

export class MedicalProviderMaster extends MedicalProviderMasterRecord {
    id: number;
    companyId: number;
    prefMedProviderId: number;
    company: Company;
    signup: Signup;
    prefferedProvider: PrefferedProvider;
    isCreated: boolean;

    constructor(props) {
        super(props);
    }
}