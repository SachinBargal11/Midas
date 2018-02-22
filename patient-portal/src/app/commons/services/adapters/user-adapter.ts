import { UserRole } from '../../models/user-role';
import * as moment from 'moment';
import { User } from '../../models/user';
import { AddressAdapter } from './address-adapter';
import { ContactAdapter } from './contact-adapter';
import { UserRoleAdapter } from './roles-adapter';
import * as _ from 'underscore';


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

    static parseResponse(userData: any): User {

        let user: User = null;
        // let tempUser = this.parseUserResponse(userData);

        if (userData) {
            let roles: UserRole[] = [];
            _.forEach(userData.roles, (currentRole: any) => {
                roles.push(UserRoleAdapter.parseResponse(currentRole));
            });
            user = new User({
                id: userData.id,
                userType: userData.userType,
                roles: roles,
                userName: userData.userName,
                firstName: userData.firstName,
                middleName: userData.middleName,
                lastName: userData.lastName,
                gender: userData.gender,
                imageLink: userData.imageLink,
                dateOfBirth: userData.dateOfBirth ? moment(userData.dateOfBirth) : null,
                isDeleted: userData.isDeleted,
                contact: ContactAdapter.parseResponse(userData.contactInfo),
                address: AddressAdapter.parseResponse(userData.addressInfo)
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