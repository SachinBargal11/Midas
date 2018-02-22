import { Company } from '../../models/company';

export class CompanyAdapter {
    static parseResponse(companyData: any): Company {

        let company = null;
        if (companyData) {
            company = new Company({
                id: companyData.id,
                name: companyData.name,
                taxId: companyData.taxId,
                companyType: companyData.companyType
            });
        }
        return company;
    }
}