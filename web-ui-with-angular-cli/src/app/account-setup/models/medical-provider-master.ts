import { Record } from 'immutable';
import * as moment from 'moment';
import { User } from '../../commons/models/user';


const MedicalProviderMasterRecord = Record({
    id: 0,
    companyId: 0,
    user: null,
    name: '',
    companyType: '',
});

export class MedicalProviderMaster extends MedicalProviderMasterRecord {

    id: number;
    user: User;
    companyId: number;
    name: string;
    companyType: string;

    constructor(props) {
        super(props);
    }

}