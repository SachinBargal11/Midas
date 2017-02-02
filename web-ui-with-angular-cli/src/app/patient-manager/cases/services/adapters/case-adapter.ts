import * as moment from 'moment';
import { Case } from '../../models/case';
import { EmployeeAdapter } from '../../services/adapters/employee-adapter';
import { InsuranceAdapter } from '../../services/adapters/insurance-adapter';
import { AddressAdapter } from '../../../../commons/services/adapters/address-adapter';
import { ContactAdapter } from '../../../../commons/services/adapters/contact-adapter';

export class CaseAdapter {
    static parseResponse(data: any): Case {

        let cases = null;
        if (data) {
            cases = new Case({
                id: data.id,
                patientId: data.patientId,
                caseName: data.caseName,
                caseTypeId: data.caseTypeId,
                age: data.age,
                dateOfInjury: moment(data.dateOfInjury),
                locationId: data.locationId,
                vehiclePlateNo: data.vehiclePlateNo,
                carrierCaseNo: data.carrierCaseNo,
                transportation: data.transportation,
                dateOfFirstTreatment: moment(data.dateOfFirstTreatment),
                caseStatusId: data.caseStatusId,
                attorneyId: data.attorneyId,
                contact: ContactAdapter.parseResponse(data.contactInfo),
                address: AddressAdapter.parseResponse(data.addressInfo),
                employee: EmployeeAdapter.parseResponse(data.employee),
                insurance: InsuranceAdapter.parseResponse(data.insurance),
                accidentAddress: AddressAdapter.parseResponse(data.accidentAddress)
            });
        }
        return cases;
    }
}
