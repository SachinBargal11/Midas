import * as moment from 'moment';
import { User } from '../../models/user';
import { AccountDetail } from '../../models/account-details';
import _ from 'underscore';


export class UserAdapter {
    static parseUserResponse(userData: any): User {

        let user: User = null;
        if (userData) {
            let tempUser: any = userData;
            user = new User(_.extend(tempUser, {
                createDate: tempUser.createDate ? moment.utc(tempUser.createDate) : null
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

    static parseSignInResponse(userData: any): User {
        let user = null;


        if (userData) {
            if (userData.user) {
                user = this.parseUserResponse(userData.user);
            }
        }
        return user;
    }


}