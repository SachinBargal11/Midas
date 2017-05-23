import { Record } from 'immutable';
import * as moment from 'moment';
import { Insurance } from '../../patients/models/insurance';
import { Adjuster } from '../../../account-setup/models/adjuster';

const MappingRecord = Record({
    patientInsuranceInfo: null,
    adjusterMaster: null
});

export class Mapping extends MappingRecord {

    patientInsuranceInfo: Insurance;
    adjusterMaster: Adjuster;

    constructor(props) {
        super(props);
    }
}