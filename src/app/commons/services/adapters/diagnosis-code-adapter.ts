import * as moment from 'moment';
import { DiagnosisCode } from '../../models/diagnosis-code';
import { DiagnosisTypeAdapter } from './diagnosis-type-adapter';
import { CompanyAdapter } from '../../../account/services/adapters/company-adapter';

export class DiagnosisCodeAdapter {
    static parseResponse(data: any): DiagnosisCode {

        let diagnosisCode = null;
        if (data) {
            diagnosisCode = new DiagnosisCode({
                id: data.id,
                diagnosisCodeId: data.diagnosisCodeId ? data.diagnosisCodeId : data.id,
                diagnosisTypeId: data.diagnosisTypeId,
                companyId: data.companyId,
                company: CompanyAdapter.parseResponse(data.company),
                diagnosisCodeText: data.diagnosisCodeText,
                diagnosisCodeDesc: data.diagnosisCodeDesc,
                diagnosisType: DiagnosisTypeAdapter.parseResponse(data.diagnosisType),
                diagnosisTypeText: data.diagnosisTypeText,
                isDeleted: data.isDeleted,
                createByUserId: data.createByUserId,
                updateByUserId: data.updateByUserId,
                createDate: moment(data.createDate), // Moment
                updateDate: moment(data.updateDate) // Moment
            });
        }
        return diagnosisCode;
    }
}