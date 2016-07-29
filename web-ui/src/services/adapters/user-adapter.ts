import {User} from '../../models/user';
import Moment from 'moment';
import _ from 'underscore';


export class UserAdapter {
    static parseResponse(userData: any): User {

        let user = null;
        if (userData) {
            let tempUser = _.omit(userData, 'address', 'account', 'contactInfo', 'updateDate');
            user = new User(tempUser);
        }
        return user;
    }
}