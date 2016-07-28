import {User} from '../../models/user';
import Moment from 'moment';


export class UserAdapter {
    static parseResponse(userData: any): User {

        let user = null;
        if (userData) {
            user = new User({
                id: userData.id,
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                mobileNo: userData.mobileNo,
                address: userData.address,
                dob: Moment(userData.dob)
            });
        }
        return user;
    }
}