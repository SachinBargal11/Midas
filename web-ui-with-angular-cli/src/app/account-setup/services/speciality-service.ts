import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import * as _ from 'underscore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';
import {Speciality} from '../models/speciality';
import {SpecialityAdapter} from './adapters/speciality-adapter';

@Injectable()
export class SpecialityService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getSpeciality(specialityId: Number): Observable<Speciality> {
        let promise: Promise<Speciality> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/Specialty/get/' + specialityId).map(res => res.json())
                .subscribe((specialityData: any) => {
                    let parsedSpeciality: Speciality = null;
                    parsedSpeciality = SpecialityAdapter.parseResponse(specialityData);
                    resolve(parsedSpeciality);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Speciality>>Observable.fromPromise(promise);
    }

    getSpecialities(): Observable<Speciality[]> {
              let promise: Promise<Speciality[]> = new Promise((resolve, reject) => {
             return this._http.post(this._url + '/Specialty/getall', JSON.stringify({}), {
                headers: this._headers
              })
                .map(res => res.json())
                .subscribe((specialityData: Array<Object>) => {
                    let specialties = (<Object[]>specialityData).map((specialityData: any) => {
                        return SpecialityAdapter.parseResponse(specialityData);
                    });
                    resolve(specialties);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Speciality[]>>Observable.fromPromise(promise);
    }

    addSpeciality(speciality: Speciality): Observable<Speciality> {
        let promise: Promise<Speciality> = new Promise((resolve, reject) => {


            let specialityRequestData = speciality.toJS();

            // remove unneeded keys 
            specialityRequestData = _.omit(specialityRequestData, 'createDate', 'updateByUserID', 'updateDate');

            return this._http.post(this._url + '/Specialty/add', JSON.stringify(specialityRequestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((specialityData: any) => {
                    let parsedSpeciality: Speciality = null;
                    parsedSpeciality = SpecialityAdapter.parseResponse(specialityData);
                    resolve(parsedSpeciality);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Speciality>>Observable.fromPromise(promise);

    }
    updateSpeciality(speciality: Speciality): Observable<Speciality> {
        let promise: Promise<Speciality> = new Promise((resolve, reject) => {


            let specialityRequestData = speciality.toJS();

            // remove unneeded keys 
            specialityRequestData = _.omit(specialityRequestData, 'createDate', 'updateByUserID', 'updateDate');

            return this._http.post(this._url + '/Specialty/add', JSON.stringify(specialityRequestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((specialityData: any) => {
                    let parsedSpeciality: Speciality = null;
                    parsedSpeciality = SpecialityAdapter.parseResponse(specialityData);
                    resolve(parsedSpeciality);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Speciality>>Observable.fromPromise(promise);

    }

}

