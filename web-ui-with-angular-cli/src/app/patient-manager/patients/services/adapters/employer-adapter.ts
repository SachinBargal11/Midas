import * as moment from 'moment';
import { Employer } from '../../models/employer';
import { AddressAdapter } from '../../../../commons/services/adapters/address-adapter';
import { ContactAdapter } from '../../../../commons/services/adapters/contact-adapter';

export class EmployerAdapter {
    static parseResponse(data: any): Employer {

        let employer = null;
        if (data) {
            employer = new Employer({
                id: data.id,
                patientId: data.patientId,
                jobTitle: data.jobTitle,
                empName: data.empName,
                isCurrentEmp: data.isCurrentEmp,
                createByUserID: data.createByUserID,
                createDate: moment(data.createDate),
                contact: ContactAdapter.parseResponse(data.contactInfo),
                address: AddressAdapter.parseResponse(data.addressInfo)
            });
        }
        return employer;
    }
}
