import {User} from '../../models/user';
import {AccountDetail} from '../../models/account-details';
import _ from 'underscore';


export class UserAdapter {
    static parseUserResponse(userData: any): User {

        let user = null;
        if (userData) {
            let tempUser = _.omit(userData, 'account', 'updateDate');
            if (userData.account) {
                tempUser.accountId = userData.account.id;
            }
            user = new User(tempUser);
        }
        return user;
    }

    static parseResponse(userData: any): AccountDetail {

        let user = null;
        let tempUser = _.omit(userData, 'account', 'updateDate');
        if (userData) {
            user = new AccountDetail({
                user: tempUser,
                address: userData.address,
                contactInfo: userData.contactInfo
            });
        }
        return user;
    }


}