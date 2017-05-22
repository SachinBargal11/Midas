import * as moment from 'moment';
import { Consent } from '../../models/consent';
import { AddressAdapter } from '../../../../commons/services/adapters/address-adapter';
import { CompanyAdapter } from '../../../../account/services/adapters/company-adapter';
import { CaseAdapter } from './case-adapter';
import { CaseDocument } from '../../models/case-document';
import { CaseDocumentAdapter } from './case-document-adapters';

export class ConsentAdapter {
    static parseResponse(data: any): Consent {

        let addConsent = null;
        let companyCaseConsentApproval: Consent[] = [];
        let caseCompanyConsentDocument: CaseDocument[] = [];
        if (data) {
            if (data.caseCompanyConsentDocument) {
                for (let consentDocument of data.caseCompanyConsentDocument) {
                    caseCompanyConsentDocument.push(CaseDocumentAdapter.parseResponse(consentDocument));
                }
            }
            if (data.companyCaseConsentApproval) {
                for (let consent of data.companyCaseConsentApproval) {
                    companyCaseConsentApproval.push(ConsentAdapter.parseResponse(consent));
                }
            }


            addConsent = new Consent({
                id: data.id,
                caseId: data.caseId,
                companyId: data.companyId,
                case: CaseAdapter.parseResponse(data.case),
                company: CompanyAdapter.parseResponse(data.company),
                // doctorId: data.doctorId,
                // consentReceived: data.consentReceived,
                //accidentAddress: AddressAdapter.parseResponse(data.accidentAddressInfo),
                // status: data.status,
                // message: data.message,
                createByUserID: data.createbyuserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateByUserID: data.updateByUserID,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null,
                documentPath: data.documentPath,
                documentName: data.documentName,
                status: data.status,
                message: data.message,
                caseCompanyConsentDocument: caseCompanyConsentDocument,
                companyCaseConsentApproval:companyCaseConsentApproval,
                


            });
        }
        return addConsent;
    }
}
