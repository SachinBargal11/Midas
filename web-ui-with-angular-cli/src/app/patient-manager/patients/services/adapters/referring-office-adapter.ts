import * as moment from 'moment';
import { ReferringOffice } from '../../models/referring-office';
import { AddressAdapter } from '../../../../commons/services/adapters/address-adapter';

export class ReferringOfficeAdapter {
    static parseResponse(data: any): ReferringOffice {

        let referringOffice = null;
        if (data) {
            referringOffice = new ReferringOffice({
                id: data.id,
                patientId: data.patientId,
                refferingOfficeId: data.refferingOfficeId,
                refferingDoctorId: data.referringDoctorId,
                npi: data.npi,
                isCurrentReffOffice: data.isCurrentReffOffice,
                addressInfo: AddressAdapter.parseResponse(data.addressInfo),
                isDeleted: data.isDeleted ? true : false,
                createByUserID: data.createbyuserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateByUserID: data.updateByUserID,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null
            });
        }
        return referringOffice;
    }
}
