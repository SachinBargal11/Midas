import {UserDetail} from '../../models/user-details';
import Moment from 'moment';


export class UserAdapter {
    static parseResponse(userData: any): UserDetail {

        let user = null;
        if (userData) {
            debugger;
            user = new UserDetail({
                user: userData.user,
                contactInfo: userData.contactInfo,
                address: userData.address
            });
        }
        return user;
    }
}