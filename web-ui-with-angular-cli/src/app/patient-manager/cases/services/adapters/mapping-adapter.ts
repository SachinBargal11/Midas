import * as moment from 'moment';
import { Mapping } from '../../models/mapping';
import { InsuranceAdapter } from '../../../patients/services/adapters/insurance-adapter';
import { AdjusterAdapter } from '../../../../account-setup/services/adapters/adjuster-adapter';

export class MappingAdapter {
    static parseResponse(data: any): Mapping {

        let mapping = null;
        if (data) {
                mapping = new Mapping({
                    id: data.id,
                    patientInsuranceInfo: InsuranceAdapter.parseResponse(data.patientInsuranceInfo),
                    adjusterMaster: AdjusterAdapter.parseResponse(data.adjusterMaster)
                });
        }
        return mapping;
    }
}
