import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { FamilyMember } from '../models/family-member';
import { FamilyMemberAdapter } from './adapters/family-member-adapter';

@Injectable()
export class FamilyMemberService {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    // private _url: string = 'http://localhost:3004/familyMember';
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        public sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this.sessionStore.session.accessToken);
    }
    getFamilyMember(familyMemberId: Number): Observable<FamilyMember> {
        let promise: Promise<FamilyMember> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/PatientFamilyMember/get/' + familyMemberId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: Array<any>) => {
                    let familyMember = null;
                    if (data) {
                        familyMember = FamilyMemberAdapter.parseResponse(data);
                        resolve(familyMember);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<FamilyMember>>Observable.fromPromise(promise);
    }

    getFamilyMembers(patientId: number): Observable<FamilyMember[]> {
        let promise: Promise<FamilyMember[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/PatientFamilyMember/getByPatientId/' + patientId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let familyMembers = (<Object[]>data).map((data: any) => {
                        return FamilyMemberAdapter.parseResponse(data);
                    });
                    resolve(familyMembers);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<FamilyMember[]>>Observable.fromPromise(promise);
    }
    addFamilyMember(familyMember: FamilyMember): Observable<FamilyMember> {
        let promise: Promise<FamilyMember> = new Promise((resolve, reject) => {
            let requestData: any = familyMember.toJS();
            requestData.ethnicitesId = requestData.ethnicitiesId;
            requestData.isInactive = false;
            requestData = _.omit(requestData, 'ethnicitiesId');
            return this._http.post(environment.SERVICE_BASE_URL + '/PatientFamilyMember/save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedFamilyMember: FamilyMember = null;
                    parsedFamilyMember = FamilyMemberAdapter.parseResponse(data);
                    resolve(parsedFamilyMember);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<FamilyMember>>Observable.fromPromise(promise);
    }
    updateFamilyMember(familyMember: FamilyMember, familyMemberId: number): Observable<FamilyMember> {
        let promise = new Promise((resolve, reject) => {
            let requestData: any = familyMember.toJS();
            requestData.id = familyMemberId;
            requestData.isInactive = false;
            requestData.ethnicitesId = requestData.ethnicitiesId;
            requestData = _.omit(requestData, 'ethnicitiesId');
            return this._http.post(environment.SERVICE_BASE_URL + '/PatientFamilyMember/save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedFamilyMember: FamilyMember = null;
                    parsedFamilyMember = FamilyMemberAdapter.parseResponse(data);
                    resolve(parsedFamilyMember);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<FamilyMember>>Observable.fromPromise(promise);
    }
    deleteFamilyMember(familyMember: FamilyMember): Observable<FamilyMember> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/PatientFamilyMember/Delete/' + familyMember.id, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data) => {
                    let parsedFamilyMember: FamilyMember = null;
                    parsedFamilyMember = FamilyMemberAdapter.parseResponse(data);
                    resolve(parsedFamilyMember);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<FamilyMember>>Observable.from(promise);
    }
}
