import { Record } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';
import { Company } from '../../../account/models/company';
import { Case } from './case';


const CaseCompanyMappingRecord = Record({
    id: 0,
    caseId: 0,
    isOriginator:false,
    case:null,
    company: null,
    isDeleted: false,
    createByUserID: 0,
    updateByUserID: 0,
    createDate: null,
    updateDate: null,
});

export class CaseCompanyMapping extends CaseCompanyMappingRecord {

    id: number;
    caseId: number;
    isOriginator:boolean;
    case:Case;
    company: Company;
    isDeleted: boolean;
    createByUserID: number;
    updateByUserID: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;
    
    constructor(props) {
        super(props);
    }

    
}