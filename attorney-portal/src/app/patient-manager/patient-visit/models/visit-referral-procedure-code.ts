import {Record} from 'immutable';
import * as moment from 'moment';
import { Procedure } from '../../../commons/models/procedure';

const VisitReferralProcedureCodeRecord = Record({
    id: 0,
    pendingReferralId: 0,
    procedureCodeId: 0,
    procedureCode: null,
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, // Moment
    updateDate: null // Moment
});

export class VisitReferralProcedureCode extends VisitReferralProcedureCodeRecord {

    id: number;
    pendingReferralId: number;
    procedureCodeId: number;
    procedureCode: Procedure;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }
}