import * as moment from 'moment';
import { Mapping } from '../../models/mapping';
import { InsuranceAdapter } from '../../../patients/services/adapters/insurance-adapter';
import { AdjusterAdapter } from '../../../../account-setup/services/adapters/adjuster-adapter';

export class MappingAdapter {
    static parseResponse(data: any): Mapping {

        let mapping = null;
        if (data) {
            data.forEach(mappingData => {
                mapping = new Mapping({
                    id: mappingData.id,
                    patientInsuranceInfo: InsuranceAdapter.parseResponse(mappingData.patientInsuranceInfo),
                    adjusterMaster: AdjusterAdapter.parseResponse(mappingData.adjusterMaster)
                });
            });
        }
        return mapping;
    }
}
