import * as moment from 'moment';
import { Employee } from '../../models/employee';
import { AddressAdapter } from '../../../../commons/services/adapters/address-adapter';
import { ContactAdapter } from '../../../../commons/services/adapters/contact-adapter';

export class EmployeeAdapter {
    static parseResponse(data: any): Employee {

        let employee = null;
        if (data) {
            employee = new Employee({
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
        return employee;
    }
}
