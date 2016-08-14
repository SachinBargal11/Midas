import {User} from '../../models/user';
import {UserDetail} from '../../models/user-details';
import Moment from 'moment';
import _ from 'underscore';


export class UserAdapter {
    static parseUserResponse(userData: any): User {

        let user = null;
        if (userData) {
            let tempUser = _.omit(userData, 'address', 'account', 'contactInfo', 'updateDate');
            if (userData.account) {
                tempUser.accountId = userData.account.id;
            }
            user = new User(tempUser);
        }
        return user;
    }

    static parseResponse(userData: any): UserDetail {

        let user = null;
        let tempUser = _.omit(userData, 'address', 'account', 'contactInfo', 'updateDate');
        if (userData) {
            user = new UserDetail({
                user: tempUser,
                address: userData.address,
                contactInfo: userData.contactInfo
            });
        }
        return user;
    }


}