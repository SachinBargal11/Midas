import * as moment from 'moment';
import { InsuranceMapping } from '../../models/insurance-mapping';
import { InsuranceAdapter } from '../../../patients/services/adapters/insurance-adapter';

export class InsuranceMappingAdapter {
    static parseResponse(data: any): InsuranceMapping {

        let insuranceMapping = null;
        if (data) {
            insuranceMapping = new InsuranceMapping({
                id: data.id,
                caseId: data.caseId,
                patientInsuranceInfos: InsuranceAdapter.parseResponse(data.patientInsuranceInfos),
                isDeleted: data.isDeleted ? true : false,
                createByUserID: data.createbyuserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateByUserID: data.updateByUserID,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null
            });
        }
        return insuranceMapping;
    }
}
