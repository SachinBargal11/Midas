import { Record } from 'immutable';
import { Company } from './company';
import { Location } from './location';
import { Contact } from './contact';
import { Address } from './address';

const LocationDetailsRecord = Record({
    company: null,
    location: null,
    contact: null,
    address: null
});

export class LocationDetails extends LocationDetailsRecord {
    company: Company;
    location: Location;
    contact: Contact;
    address: Address;

    constructor(props) {
        super(props);
    }

}