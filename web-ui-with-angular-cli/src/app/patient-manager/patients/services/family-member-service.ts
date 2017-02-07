import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { FamilyMember } from '../models/family-member';
import { FamilyMemberAdapter } from './adapters/family-member-adapter';

@Injectable()
export class FamilyMemberService {
    private _url: string = 'http://localhost:3004/familyMember';
    private _headers: Headers = new Headers();

    constructor(private _http: Http) {
        this._headers.append('Content-Type', 'application/json');
    }
    getFamilyMember(familyMemberId: Number): Observable<FamilyMember> {
        let promise: Promise<FamilyMember> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '?id=' + familyMemberId).map(res => res.json())
                .subscribe((data: Array<any>) => {
                    let familyMember = null;
                    if (data.length) {
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

    getFamilyMembers(): Observable<FamilyMember[]> {
        let promise: Promise<FamilyMember[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url)
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
            return this._http.post(this._url, JSON.stringify(familyMember), {
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
    updateFamilyMember(familyMember: FamilyMember): Observable<FamilyMember> {
        let promise = new Promise((resolve, reject) => {
            return this._http.put(`${this._url}/${familyMember.id}`, JSON.stringify(familyMember), {
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
            return this._http.delete(`${this._url}/${familyMember.id}`)
                .map(res => res.json())
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
