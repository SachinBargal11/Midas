import { CompanyConsent } from '../../models/company-consent'

export class CompanyConsentAdapter {
    static parseResponse(data: any): CompanyConsent {

        let companyConsent = null;
        if (data) {
            companyConsent = new CompanyConsent({
                id: data.id,
                caseId: data.caseId,
                name: data.name,
                taxId: data.taxId,
                companyType: data.companyType,
                companyCaseConsentApproval: data.companyCaseConsentApproval,
                caseCompanyConsentDocument: data.caseCompanyConsentDocument,
            });
        }
        return companyConsent;
    }
}