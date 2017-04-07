import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { FamilyMember } from '../models/family-member';
import { FamilyMemberService } from '../services/family-member-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';

@Injectable()
export class FamilyMemberStore {

    private _familyMembers: BehaviorSubject<List<FamilyMember>> = new BehaviorSubject(List([]));

    constructor(
        private _familyMemberService: FamilyMemberService,
        public sessionStore: SessionStore
    ) {
        this.sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    get familyMembers() {
        return this._familyMembers.asObservable();
    }

    getFamilyMembers(patientId: number): Observable<FamilyMember[]> {
        let promise = new Promise((resolve, reject) => {
            this._familyMemberService.getFamilyMembers(patientId).subscribe((familyMembers: FamilyMember[]) => {
                this._familyMembers.next(List(familyMembers));
                resolve(familyMembers);
            }, error => {
                reject(error);
            });
        });
        return <Observable<FamilyMember[]>>Observable.fromPromise(promise);
    }

    findFamilyMemberById(id: number) {
        let familyMembers = this._familyMembers.getValue();
        let index = familyMembers.findIndex((currentFamilyMember: FamilyMember) => currentFamilyMember.id === id);
        return familyMembers.get(index);
    }

    fetchFamilyMemberById(id: number): Observable<FamilyMember> {
        let promise = new Promise((resolve, reject) => {
            let matchedFamilyMember: FamilyMember = this.findFamilyMemberById(id);
            if (matchedFamilyMember) {
                resolve(matchedFamilyMember);
            } else {
                this._familyMemberService.getFamilyMember(id).subscribe((familyMember: FamilyMember) => {
                    resolve(familyMember);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<FamilyMember>>Observable.fromPromise(promise);
    }

    addFamilyMember(familyMember: FamilyMember): Observable<FamilyMember> {
        let promise = new Promise((resolve, reject) => {
            this._familyMemberService.addFamilyMember(familyMember).subscribe((familyMember: FamilyMember) => {
                this._familyMembers.next(this._familyMembers.getValue().push(familyMember));
                resolve(familyMember);
            }, error => {
                reject(error);
            });
        });
        return <Observable<FamilyMember>>Observable.from(promise);
    }
    updateFamilyMember(familyMember: FamilyMember, familyMemberId: number): Observable<FamilyMember> {
        let promise = new Promise((resolve, reject) => {
            this._familyMemberService.updateFamilyMember(familyMember, familyMemberId).subscribe((updatedFamilyMember: FamilyMember) => {
                let familyMember: List<FamilyMember> = this._familyMembers.getValue();
                let index = familyMember.findIndex((currentFamilyMember: FamilyMember) =>
                                        currentFamilyMember.id === updatedFamilyMember.id);
                familyMember = familyMember.update(index, function () {
                    return updatedFamilyMember;
                });
                this._familyMembers.next(familyMember);
                resolve(familyMember);
            }, error => {
                reject(error);
            });
        });
        return <Observable<FamilyMember>>Observable.from(promise);
    }
    deleteFamilyMember(familyMember: FamilyMember) {
        let familyMembers = this._familyMembers.getValue();
        let index = familyMembers.findIndex((currentFamilyMember: FamilyMember) => currentFamilyMember.id === familyMember.id);
        let promise = new Promise((resolve, reject) => {
            this._familyMemberService.deleteFamilyMember(familyMember)
                .subscribe((familyMember: FamilyMember) => {
                    this._familyMembers.next(familyMembers.delete(index));
                    resolve(familyMember);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<FamilyMember>>Observable.from(promise);
    }

    resetStore() {
        this._familyMembers.next(this._familyMembers.getValue().clear());
    }
}
