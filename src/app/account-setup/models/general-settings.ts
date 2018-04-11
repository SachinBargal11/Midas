import { Record } from 'immutable';
import * as moment from 'moment';
import { Company } from '../../account/models/company';

const GeneralSettingRecord = Record({
    id: 0,
    companyId: 0,
    slotDuration: null,
    company: null,
    invitationID: 0,
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0,

});

export class GeneralSetting extends GeneralSettingRecord {
    id: number;
    companyId: number;
    slotDuration: number;
    company: Company; 
    invitationID: number;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;

    constructor(props) {
        super(props);
    }
}