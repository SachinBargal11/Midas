import { Record } from 'immutable';
import * as moment from 'moment';

const PriorAccidentRecord = Record({
    id: 0,
    caseId: 0,
    accidentBefore: false,
    accidentBeforeExplain: '',
    lawsuitWorkerCompBefore: false,
    lawsuitWorkerCompBeforeExplain: '',
    physicalComplaintsBefore: false,
    physicalComplaintsBeforeExplain: '',
    otherInformation: '',
    isDeleted: false
});

export class PriorAccident extends PriorAccidentRecord {

    id: number;
    caseId: number;
    accidentBefore: boolean;
    accidentBeforeExplain: string;
    lawsuitWorkerCompBefore: boolean;
    lawsuitWorkerCompBeforeExplain: string;
    physicalComplaintsBefore: boolean;
    physicalComplaintsBeforeExplain: string;
    otherInformation: string;
    isDeleted: boolean;

    constructor(props) {
        super(props);
    }

}

