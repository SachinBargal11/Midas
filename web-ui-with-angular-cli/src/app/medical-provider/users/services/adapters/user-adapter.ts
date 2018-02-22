import { UserRole } from '../../../../commons/models/user-role';
import * as moment from 'moment';
import { User } from '../../../../commons/models/user';
import { AddressAdapter } from '../../../../commons/services/adapters/address-adapter';
import { ContactAdapter } from '../../../../commons/services/adapters/contact-adapter';
import { UserRoleAdapter } from './roles-adapter';
import * as _ from 'underscore';
import { Company } from '../../../../account/models/company';

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


    static parseUserExistResponse(userData: any): User {
        let user: User = null;
        let companies: Company[] = [];
        // let tempUser = this.parseUserResponse(userData);

        if (userData) {
            let roles: UserRole[] = [];
            _.forEach(userData.roles, (currentRole: any) => {
                roles.push(UserRoleAdapter.parseResponse(currentRole));
            });
            if (userData.userCompanies) {
                for (let company of userData.userCompanies) {
                    // companies.push(CompanyAdapter.parseResponse(company));
                    companies.push(company);
                }
            }

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
                address: AddressAdapter.parseResponse(userData.addressInfo),
                companies: companies
            });
        }
        return user;
    }

}