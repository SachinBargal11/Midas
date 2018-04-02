import * as moment from 'moment';
import { PriorAccident } from '../../models/prior-accident';

export class PriorAccidentAdapter {
    static parseResponse(data: any): PriorAccident {

        let priorAccident = null;
        if (data) {
            priorAccident = new PriorAccident({
                id: data.id,
                caseId: data.caseId,
                accidentBefore: data.accidentBefore ? '1' : '0',
                accidentBeforeExplain: data.accidentBeforeExplain,
                lawsuitWorkerCompBefore: data.lawsuitWorkerCompBefore ? '1' : '0',
                lawsuitWorkerCompBeforeExplain: data.lawsuitWorkerCompBeforeExplain,
                physicalComplaintsBefore: data.physicalComplaintsBefore ? '1' : '0',
                physicalComplaintsBeforeExplain: data.physicalComplaintsBeforeExplain,
                otherInformation: data.otherInformation,
                isDeleted: data.isDeleted ? '1' : '0'
            });
        }
        return priorAccident;
    }
}
