import * as moment from 'moment';
import { FamilyMember } from '../../models/family-member';
// import { AddressAdapter } from '../../../../commons/services/adapters/address-adapter';
// import { ContactAdapter } from '../../../../commons/services/adapters/contact-adapter';

export class FamilyMemberAdapter {
    static parseResponse(data: any): FamilyMember {

        let familyMember = null;
        if (data) {
            familyMember = new FamilyMember({
                id: data.id,
                relationToPatient: data.relationToPatient,
                name: data.name,
                familyName: data.familyName,
                prefix: data.prefix,
                suffix: data.suffix,
                age: data.age,
                deceasedAge: data.deceasedAge,
                dob: data.dob,
                gender: data.gender,
                races: data.races,
                ethnicities: data.ethnicities
            });
        }
        return familyMember;
    }
}
