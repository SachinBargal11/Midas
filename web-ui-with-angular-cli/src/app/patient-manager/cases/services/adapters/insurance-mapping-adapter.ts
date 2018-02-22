import * as moment from 'moment';
import { InsuranceMapping } from '../../models/insurance-mapping';
import { MappingAdapter } from './mapping-adapter';
import { Mapping} from '../../models/mapping';

export class InsuranceMappingAdapter {
    static parseResponse(data: any): InsuranceMapping {

        let insuranceMapping = null;
        let mappings:Mapping[] = []
        if (data) {
            if (data.mappings) {
                for (let mapping of data.mappings) {
                    mappings.push(MappingAdapter.parseResponse(mapping));
                }
            }
            insuranceMapping = new InsuranceMapping({
                id: data.id,
                caseId: data.caseId,
                mappings:mappings,
                // mappings: MappingAdapter.parseResponse(data.mappings),
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
