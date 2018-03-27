import {Record} from 'immutable';
import * as moment from 'moment';
import { Room } from '../../medical-provider/rooms/models/room';
import { Tests } from '../../medical-provider/rooms/models/tests';
import { Speciality } from '../../account-setup/models/speciality';
import { Company } from '../../account/models/company';

const ProcedureRecord = Record({
    id: 0,
    procedureCodeId: 0,
    specialityId: 0,
    roomId: 0,
    roomTestId: 0,
    companyId: 0,
    amount: 0,
    procedureAmount:0,
    procedureUnit:0,
    procedureOldUnit: 0,
    procedureTotalAmount:0,
    procedureCodeText: '',
    procedureCodeDesc: '',
    company: null,
    room: null,
    roomTest: null,
    speciality: null,
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, // Moment
    updateDate: null, // Moment
    originalResponse: null,
    isPreffredCode:false,
    noOfVisits:0
});

export class Procedure extends ProcedureRecord {

    id: number;
    procedureCodeId: number;
    specialityId: number;
    roomId: number;
    roomTestId: number;
    companyId: number;
    procedureCodeText: string;
    procedureCodeDesc: string;
    amount: number;
    procedureAmount: number;
    procedureUnit: number;
    procedureOldUnit: number;
    procedureTotalAmount: number;
    company: Company;
    room: Room;
    roomTest: Tests;
    speciality: Speciality;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;
    originalResponse: any;
    isPreffredCode:boolean;
    noOfVisits:number;

    constructor(props) {
        super(props);
    }
}