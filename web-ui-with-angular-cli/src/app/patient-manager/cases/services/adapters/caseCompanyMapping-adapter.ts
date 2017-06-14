import { Company } from '../../../../account/models/company';
import { CompanyAdapter } from '../../../../account/services/adapters/company-adapter';
import * as moment from 'moment';
import { Case } from '../../models/case';
import { CaseCompanyMapping } from '../../models/caseCompanyMapping';
import { CaseAdapter } from './case-adapter';


export class CaseCompanyMappingAdapter {
    static parseResponse(data: any): CaseCompanyMapping {


        let caseCompanyMapping = null;

        caseCompanyMapping = new CaseCompanyMapping({
            id: data.id,
            caseId: data.caseId,
            isOriginator:data.isOriginator ? true : false,
            company: CompanyAdapter.parseResponse(data.company),
            isDeleted: data.isDeleted ? true : false,
            createByUserID: data.createbyuserID,
            createDate: data.createDate ? moment.utc(data.createDate) : null,
            updateByUserID: data.updateByUserID,
            updateDate: data.updateDate ? moment.utc(data.updateDate) : null,
            caseSource: data.caseSource,
            // createdByCompanyId: data.createdByCompanyId,
            // createdByCompany: CompanyAdapter.parseResponse(data.createdByCompany)
        });
         return caseCompanyMapping;
    }
}
    

