import { DocumentAdapter } from '../../../../commons/services/adapters/document-adapter';
import { CaseDocument } from '../../models/case-document';
import * as moment from 'moment';
import { CompanyAdapter } from '../../../../account/services/adapters/company-adapter';
import { Company } from '../../../../account/models/company';
export class CaseDocumentAdapter {
    static parseResponse(data: any): CaseDocument {

        let caseDocument = null;
        let companies: Company[] = [];
        if (data.company) {
            companies.push(CompanyAdapter.parseResponse(data.company));
        }

        caseDocument = new CaseDocument({
            caseId: data.id,
            document: DocumentAdapter.parseResponse(data),
            companies: companies
        });

        return caseDocument;
    }
}
