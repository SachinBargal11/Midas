import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import _ from 'underscore';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import Environment from '../scripts/environment';
import {Specialty} from '../models/speciality';
import {SessionStore} from '../stores/session-store';
import {SpecialityAdapter} from './adapters/speciality-adapter';

@Injectable()
export class SpecialityService {

    private _url: string = `${Environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getSpeciality(specialtyId: Number): Observable<Specialty> {
        let promise: Promise<Specialty> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/Specialty/Get/' + specialtyId).map(res => res.json())
                .subscribe((specialtyData: any) => {
                    let parsedSpecialty: Specialty = null;
                    parsedSpecialty = SpecialityAdapter.parseResponse(specialtyData);
                    resolve(parsedSpecialty);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Specialty>>Observable.fromPromise(promise);
    }

    getSpecialities(): Observable<Specialty[]> {
              let promise: Promise<Specialty[]> = new Promise((resolve, reject) => {
             return this._http.post(this._url + '/Specialty/GetAll', JSON.stringify({'speciality': [{}]}), {
                headers: this._headers
              })
                .map(res => res.json())
                .subscribe((specialtyData: Array<Object>) => {
                    let specialties = (<Object[]>specialtyData).map((specialtyData: any) => {
                        return SpecialityAdapter.parseResponse(specialtyData);
                    });
                    resolve(specialties);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Specialty[]>>Observable.fromPromise(promise);
    }

    addSpeciality(specialty: Specialty): Observable<Specialty> {
        let promise: Promise<Specialty> = new Promise((resolve, reject) => {


            let specialtyRequestData = specialty.toJS();

            // remove unneeded keys 
            specialtyRequestData.specialty = _.omit(specialtyRequestData.specialty, 'createDate', 'updateByUserID', 'updateDate');

            return this._http.post(this._url + '/Specialty/Add', JSON.stringify(specialtyRequestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((specialtyData: any) => {
                    let parsedSpecialty: Specialty = null;
                    parsedSpecialty = SpecialityAdapter.parseResponse(specialtyData);
                    resolve(parsedSpecialty);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Specialty>>Observable.fromPromise(promise);

    }
    updateSpeciality(specialty: Specialty): Observable<Specialty> {
        let promise: Promise<Specialty> = new Promise((resolve, reject) => {


            let specialtyRequestData = specialty.toJS();

            // remove unneeded keys 
            specialtyRequestData.specialty = _.omit(specialtyRequestData.specialty, 'createDate', 'updateByUserID', 'updateDate');

            return this._http.post(this._url + '/Specialty/Add', JSON.stringify(specialtyRequestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((specialtyData: any) => {
                    let parsedSpecialty: Specialty = null;
                    parsedSpecialty = SpecialityAdapter.parseResponse(specialtyData);
                    resolve(parsedSpecialty);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Specialty>>Observable.fromPromise(promise);

    }

}

