import { Record } from 'immutable';
import * as moment from 'moment';
import { User } from '../../commons/models/user';


const AttorneyRecord = Record({
    id: 0,
    // companyId: 0,
    user: null
});

export class Attorney extends AttorneyRecord {

    id: number;
    user: User;
    // companyId: number;
 
    

    constructor(props) {
        super(props);
    }

}