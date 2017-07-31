import * as moment from 'moment';
import { DiagnosisType } from '../../models/diagnosis-type';
import { DiagnosisCodeAdapter } from './diagnosis-code-adapter';
import { CompanyAdapter } from '../../../account/services/adapters/company-adapter';

export class DiagnosisTypeAdapter {
    static parseResponse(data: any): DiagnosisType {

        let diagnosisType = null;
        if (data) {
            diagnosisType = new DiagnosisType({
                id: data.id,
                companyId: data.companyId,
                company: CompanyAdapter.parseResponse(data.company),
                diagnosisTypeText: data.diagnosisTypeText,
                diagnosisCodes: DiagnosisCodeAdapter.parseResponse(data.diagnosisCodes),
                isDeleted: data.isDeleted,
                createByUserId: data.createByUserId,
                updateByUserId: data.updateByUserId,
                createDate: moment(data.createDate), // Moment
                updateDate: moment(data.updateDate) // Moment
            });
        }
        return diagnosisType;
    }
}