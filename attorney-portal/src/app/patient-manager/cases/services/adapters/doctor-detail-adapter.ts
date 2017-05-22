// import { Company } from '../../models/company';
// import { Account } from '../../models/account';
// import { UserAdapter } from '../../../medical-provider/users/services/adapters/user-adapter';
// import { CompanyAdapter } from './company-adapter';


// export class DoctorDetailAdapter {


//     static parseResponse(accountData: any): Account {

//         let account = null;
//         let companies: Company[] = [];

//         if (accountData) {
//             if (accountData.usercompanies) {
//                 for (let company of accountData.usercompanies) {
//                     companies.push(CompanyAdapter.parseResponse(company.company));
//                 }
//             }
//             account = new Account({
//                 user: UserAdapter.parseUserResponse(accountData.user),
//                 companies: companies
//             });
//         }
//         return account;
//     }
// }
