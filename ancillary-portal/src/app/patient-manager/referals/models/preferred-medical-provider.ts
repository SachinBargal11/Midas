import { Record } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';
import { Doctor } from '../../../medical-provider/users/models/doctor';
import { Room } from '../../../medical-provider/rooms/models/room';


const PrefferedMedicalProviderRecord = Record({
    id: 0,
    name: '',
    // registrationComplete: false,
    companyStatusType: 0,
    doctor: [],
    room: [],
    invitationID: 0,
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0

});

export class PrefferedMedicalProvider extends PrefferedMedicalProviderRecord {

    id: number;
    name: string;
    // registrationComplete: false;
    companyStatusType:number;
    doctor: Doctor[];
    room: Room[];
    invitationID: number;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;

    constructor(props) {
        super(props);
    }
}
