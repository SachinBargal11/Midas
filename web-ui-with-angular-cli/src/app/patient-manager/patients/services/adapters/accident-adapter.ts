import * as moment from 'moment';
import { Accident } from '../../models/accident';
import { AddressAdapter } from '../../../../commons/services/adapters/address-adapter';

export class AccidentAdapter {
    static parseResponse(data: any): Accident {

        let employer = null;
        if (data) {
            employer = new Accident({
                id: data.id,
                accidentDate: data.accidentDate,
                plateNumber: data.plateNumber,
                reportNumber: data.reportNumber,
                hospitalName: data.hospitalName,
                hospitalAddress: data.hospitalAddress,
                injuryDescription: data.injuryDescription,
                dateOfAdmission: moment(),
                patientType: data.patientType,
                createByUserID: data.createByUserID,
                createDate: moment(data.createDate),
                address: AddressAdapter.parseResponse(data.addressInfo)
            });
        }
        return employer;
    }
}
