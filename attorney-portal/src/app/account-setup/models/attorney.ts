import { Record } from 'immutable';
import * as moment from 'moment';
import { User } from '../../commons/models/user';
import { Company } from '../../account/models/company';
import { PrefferedAttorney } from '../../account-setup/models/preffered-attorney';
import { Signup } from '../../account-setup/models/signup';


const AttorneyRecord = Record({
    id: 0,
    companyId: 0,
    prefAttorneyProviderId: null,
    company: null,
    signup: null,
    prefferedAttorney: null,
    isCreated: null,
});

export class Attorney extends AttorneyRecord {

    id: number;
    companyId: number;
    prefAttorneyProviderId: number;
    company: Company;
    signup: Signup;
    prefferedAttorney: PrefferedAttorney;
    isCreated: boolean;


    constructor(props) {
        super(props);
    }

}