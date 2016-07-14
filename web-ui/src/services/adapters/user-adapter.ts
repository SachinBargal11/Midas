import {User} from '../../models/user';

export class UserAdapter {
    static parseResponse(userData: any): User {

        let user = null;
        if (userData) {
            user = new User({
                id: userData.id,
                name: userData.name,
                phone: userData.phone,
                email: userData.email
            });
        }
        return user;
    }
}