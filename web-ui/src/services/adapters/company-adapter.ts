import {Company} from '../../models/company';

export class CompanyAdapter {
    static parseResponse(companyData: any): Company {

        let company = null;
        if (companyData) {
            company = new Company({
                id: companyData.id,
                companyName: companyData.companyName,
                contactName: companyData.contactName,
                taxId: companyData.taxId,
                phoneNo: companyData.phoneNo,
                companyType: companyData.companyType,
                email: companyData.email,
                subscriptionPlan: companyData.subscriptionPlan
            });
        }
        return company;
    }
}