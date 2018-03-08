import * as moment from 'moment';
import { Procedure } from '../../models/procedure';
import { CompanyAdapter } from '../../../account/services/adapters/company-adapter';
import { RoomsAdapter } from '../../../medical-provider/rooms/services/adapters/rooms-adapter';
import { TestsAdapter } from '../../../medical-provider/rooms/services/adapters/tests-adapter';
import { SpecialityAdapter } from '../../../account-setup/services/adapters/speciality-adapter';

export class ProcedureAdapter {
    static parseResponse(data: any): Procedure {

        let procedure = null;
        if (data) {
            procedure = new Procedure({
                id: data.id,
                procedureCodeId: data.procedureCodeId ? data.procedureCodeId : data.id,
                specialityId: data.specialityId,
                roomId: data.roomId,
                roomTestId: data.roomTestId,
                companyId: data.companyId,
                amount: data.amount ? data.amount : null,
                procedureAmount: data.procedureAmount !=0 && data.procedureAmount != null ? data.procedureAmount : data.amount,
                procedureUnit: data.procedureUnit ? data.procedureUnit : 0 ,
                procedureOldUnit: data.procedureUnit ? data.procedureUnit : 0 ,
                procedureTotalAmount: data.procedureTotalAmount !=0 && data.procedureTotalAmount != null ? data.procedureTotalAmount : 0,
                procedureCodeText: data.procedureCodeText,
                procedureCodeDesc: data.procedureCodeDesc,
                company: CompanyAdapter.parseResponse(data.company),
                room: RoomsAdapter.parseResponse(data.room),
                roomTest: TestsAdapter.parseResponse(data.roomTest),
                speciality: SpecialityAdapter.parseResponse(data.specialty),
                isDeleted: data.isDeleted,
                createByUserId: data.createByUserId,
                updateByUserId: data.updateByUserId,
                createDate: moment(data.createDate), // Moment
                updateDate: moment(data.updateDate), // Moment
                originalResponse: data
            });
        }
        return procedure;
    }
    static parsePreferredResponse(data: any): Procedure {

        let procedure = null;
        if (data) {
            procedure = new Procedure({
                id: data.procedureCodeId,
                procedureCodeId: data.procedureCodeId,
                procedureCodeText: data.procedureCodeText,
                procedureCodeDesc: data.procedureCodeDesc,
                amount: data.amount ? data.amount : null,
                procedureAmount: data.procedureAmount !=0 && data.procedureAmount != null ? data.procedureAmount : data.amount,
                procedureUnit: data.procedureUnit != 0 &&  data.procedureUnit != null ? data.procedureUnit : 0,
                procedureTotalAmount: data.procedureTotalAmount !=0 && data.procedureTotalAmount != null ? data.procedureTotalAmount : 0,
                isPreffredCode: data.isPreffredCode? data.isPreffredCode:false,
                specialityId: data.specialtyId,
                originalResponse: data
            });
        }
        return procedure;
    }
}