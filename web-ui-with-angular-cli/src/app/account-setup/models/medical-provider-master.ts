import { Record } from 'immutable';
import * as moment from 'moment';
import { User } from '../../commons/models/user';


const MedicalProviderMasterRecord = Record({
    id: 0,
 companyId: 0,
    user: null
});

export class MedicalProviderMaster extends MedicalProviderMasterRecord {

    id: number;
    user: User;
     companyId: number;
    

    constructor(props) {
        super(props);
    }

}