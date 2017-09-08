import { Record } from 'immutable';
import * as moment from 'moment';
import { Relation } from './enums/relation';
import { Races } from './enums/race';
import { Ethnicities } from './enums/ethnicities';

const FamilyMemberRecord = Record({
    id: 0,
    caseId: 0,
    relationId: Relation.SPOUSE,
    isInActive: false,
    // fullName: '',
    // familyName: '',
    // prefix: '',
    // sufix: '',
    firstName: '',
    middleName: '',
    lastName: '',
    age: 0,
    genderId: 0,
    raceId: 0,
    ethnicitiesId: 0,
    cellPhone: '',
    workPhone: '',
    primaryContact: false
});

export class FamilyMember extends FamilyMemberRecord {

    id: number;
    caseId: number;
    relationId: Relation;
    isInActive: boolean;
    // fullName: string;
    // familyName: string
    // prefix: string;
    // sufix: string;
    firstName: string;
    middleName: string;
    lastName: string;
    age: number;
    genderId: number;
    raceId: number;
    ethnicitiesId: number;
    cellPhone: string;
    workPhone: string;
    primaryContact: boolean;

    constructor(props) {
        super(props);
    }

    get relationLabel(): string {
        return FamilyMember.getRelationLabel(this.relationId);
    }
    // tslint:disable-next-line:member-ordering
    static getRelationLabel(relation: Relation): string {
        switch (relation) {
            case Relation.SPOUSE:
                return 'Spouse';
            case Relation.CHILD:
                return 'Child';
            // case Relation.SISTER:
            //     return 'Sister';
            // case Relation.BROTHER:
            //     return 'Brother';
        }
    }

    get raceLabel(): string {
        return FamilyMember.getRaceLabel(this.raceId);
    }
    static getRaceLabel(race: Races): string {
        switch (race) {
            case Races.AMERICAN_INDIAN_OR_ALASKA_NATIVE:
                return 'American Indian or Alaska Native';
            case Races.ASIAN:
                return 'Asian';
            case Races.BLACK_OR_AFRICAN_AMERICAN:
                return 'Black or African American';
            case Races.NATIVE_HAWAIIAN_OR_OTHER_PACIFIC_ISLANDER:
                return 'Native Hawaiian Or Other Pacific Islander';
            case Races.WHITE:
                return 'White';
            case Races.DECLINED_TO_SPECIFY:
                return 'Declined tO Specify';
        }
    }

    get ethnicitiesLabel(): string {
        return FamilyMember.getEthnicitiesLabel(this.ethnicitiesId);
    }
    static getEthnicitiesLabel(ethnicities: Ethnicities): string {
        switch (ethnicities) {
            case Ethnicities.HISPANIC_OR_LATINO:
                return 'Hispanic Or Latino';
            case Ethnicities.NOT_HISPANIC_OR_LATINO:
                return 'Not Hispanic Or Latino';
            case Ethnicities.DECLINED_TO_SPECIFY:
                return 'Declined tO Specify';
        }
    }

     get displayName(): string {
        return this.firstName + ' ' + this.lastName;
    }

}
