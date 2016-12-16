import { Account } from '../../models/account';
import { UserAdapter } from './user-adapter';
import { CompanyAdapter } from './company-adapter';


export class AccountAdapter {


    static parseResponse(accountData: any): Account {

        let user = null;

        if (accountData) {
            user = new Account({
                user: UserAdapter.parseUserResponse(accountData.user),
                company: CompanyAdapter.parseResponse(accountData.company)
            });
        }
        return user;
    }

}