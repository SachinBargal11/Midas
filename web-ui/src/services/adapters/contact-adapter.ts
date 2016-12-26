import { Contact } from '../../models/contact';
import moment from 'moment';

export class ContactAdapter {
    static parseResponse(contactData: any): Contact {

        let contact = null;
        if (contactData) {
            contact = new Contact({
                id: contactData.id,
                name: contactData.name,
                cellPhone: contactData.cellPhone,
                emailAddress: contactData.emailAddress,
                homePhone: contactData.homePhone,
                workPhone: contactData.workPhone,
                faxNo: contactData.faxNo,
                isDeleted: contactData.isDeleted,
                createByUserId: contactData.createByUserId,
                updateByUserId: contactData.updateByUserId,
                createDate: moment(contactData.createDate), // Moment
                updateDate: moment(contactData.updateDate) // Moment
            });
        }
        return contact;
    }
}