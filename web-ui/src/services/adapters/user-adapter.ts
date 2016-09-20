import * as moment from 'moment';
import {User} from '../../models/user';
import {AccountDetail} from '../../models/account-details';
import _ from 'underscore';


export class UserAdapter {
    static parseUserResponse(userData: any): User {

        let user: User = null;
        if (userData) {
            let tempUser: any = _.omit(userData, 'account', 'updateDate');
            if (userData.account) {
                tempUser.accountId = userData.account.id;
            }
            user = new User(_.extend(tempUser, {
                createDate: moment.utc(tempUser.createDate)
            }));
        }
        return user;
    }

    static parseResponse(userData: any): AccountDetail {

        let user = null;
        let tempUser = this.parseUserResponse(userData);

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