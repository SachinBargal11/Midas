import {SubUser} from '../../models/sub-user';
import Moment from 'moment';


export class SubUserAdapter {
    static parseResponse(subuserData: any): SubUser {

        let subuser = null;
        if (subuserData) {
            subuser = new SubUser({
                id: subuserData.id,
                firstname: subuserData.firstname,
                lastname: subuserData.lastname,
                email: subuserData.email,
                mobileNo: subuserData.mobileNo,
                address: subuserData.address,
                dob: Moment(subuserData.dob)
            });
        }
        return subuser;
    }
}