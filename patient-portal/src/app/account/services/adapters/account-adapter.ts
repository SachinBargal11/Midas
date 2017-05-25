import { Account } from '../../models/account';
import { UserAdapter } from '../../../commons/services/adapters/user-adapter';
import { CompanyAdapter } from './company-adapter';
import { Company } from '../../models/company';

export class AccountAdapter {


    static parseResponse(accountData: any): Account {

        let account = null;
        let companies: Company[] = [];
        if (accountData) {

            if (accountData.usercompanies) {
                for (let company of accountData.usercompanies) {
                    companies.push(CompanyAdapter.parseResponse(company.company));
                }
            }

            account = new Account({
                user: UserAdapter.parseUserResponse(accountData.user),
                companies: companies
            });
        }
        return account;
    }

    static parseStoredData(accountData: any): Account {
        let account = null;
        let companies: Company[] = [];
        if (accountData) {
            if (accountData.companies) {
                for (let company of accountData.companies) {
                    companies.push(CompanyAdapter.parseResponse(company));
                }
            }

            account = new Account({
                user: UserAdapter.parseUserResponse(accountData.user),
                companies: companies
            });
        }
        return account;
    }

}