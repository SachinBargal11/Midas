import * as moment from 'moment';
import { Attorney } from '../../models/attorney';
import { UserAdapter } from '../../../medical-provider/users/services/adapters/user-adapter';

export class AttorneyAdapter {
    static parseResponse(data: any): Attorney {

        let attorney = null;
        if (data) {
            attorney = new Attorney({
                id: data.id,
                user: UserAdapter.parseResponse(data.user)
            });
        }
        return attorney;
    }
}