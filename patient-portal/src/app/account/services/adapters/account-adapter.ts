import { Account } from '../../models/account';
import { UserAdapter } from '../../../commons/services/adapters/user-adapter';


export class AccountAdapter {


    static parseResponse(accountData: any): Account {

        let account = null;

        if (accountData) {
            account = new Account({
                user: UserAdapter.parseUserResponse(accountData.user)
            });
        }
        return account;
    }

    static parseStoredData(accountData: any): Account {
        let account = null;
        if (accountData) {
            account = new Account({
                user: UserAdapter.parseUserResponse(accountData.user),
            });
        }
        return account;
    }

}