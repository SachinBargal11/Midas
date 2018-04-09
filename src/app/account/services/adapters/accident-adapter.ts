import * as moment from 'moment';
import { Accident } from '../../models/accident';
import { AddressAdapter } from '../../../commons/services/adapters/address-adapter';

export class AccidentAdapter {
    static parseResponse(data: any): Accident {

        let accident = null;
        if (data) {
            accident = new Accident({
                id: data.id,
                accidentAddress: AddressAdapter.parseResponse(data.accidentAddressInfo),
                hospitalAddress: AddressAdapter.parseResponse(data.hospitalAddressInfo),
                accidentDate: data.accidentDate ? moment(data.accidentDate) : null,
                plateNumber: data.plateNumber,
                reportNumber: data.reportNumber,
                hospitalName: data.hospitalName,
                describeInjury: data.describeInjury,
                dateOfAdmission: data.dateOfAdmission ? moment(data.dateOfAdmission) : null,
                isCurrentAccident: data.isCurrentAccident ? 1 : 0,
                additionalPatients: data.additionalPatients,
                patientTypeId: data.patientTypeId,
                isDeleted: data.isDeleted ? true : false,
                createByUserID: data.createbyuserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateByUserID: data.updateByUserID,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null
            });
        }
        return accident;
    }
}
