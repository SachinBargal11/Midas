import {Record} from 'immutable';

const UserRecord = Record({
    id: 0,
    name: "",
    phone: "",
    email: ""
});

export class User extends UserRecord {

    id: number;
    name: string;
    phone: string;
    email: string;        

    constructor(props) {
        super(props);
    }

    
    public get displayName() : string {
        return this.name;
    }
    

}