import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import * as _ from 'underscore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import Environment from '../../../scripts/environment';
import {Doctor} from '../models/doctor';
import {DoctorSpeciality} from '../models/doctor-speciality';
import { DoctorAdapter } from './adapters/doctor-adapter';

@Injectable()
export class DoctorsService {

    private _url: string = `${Environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getDoctor(doctorId: Number): Observable<Doctor> {
        let promise: Promise<Doctor> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/Doctor/Get/' + doctorId).map(res => res.json())
                .subscribe((data: any) => {
                    let parsedDoctor: Doctor = null;
                    parsedDoctor = DoctorAdapter.parseResponse(data);
                    resolve(parsedDoctor);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Doctor>>Observable.fromPromise(promise);
    }
    getDoctors(): Observable<Doctor[]> {
        let promise: Promise<Doctor[]> = new Promise((resolve, reject) => {
            return this._http.post(this._url + '/Doctor/getall', JSON.stringify({}), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let doctors = (<Object[]>data).map((doctorData: any) => {
                        return DoctorAdapter.parseResponse(doctorData);
                    });
                    resolve(doctors);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Doctor[]>>Observable.fromPromise(promise);
    }

    addDoctor(doctorDetail: Doctor): Observable<Doctor> {
        let promise: Promise<Doctor> = new Promise((resolve, reject) => {


            let doctorDetailRequestData = doctorDetail.toJS();

            // add/replace values which need to be changed
            // _.extend(doctorDetailRequestData.user, {
            //     userType: UserType[doctorDetailRequestData.user.userType],
            //     dateOfBirth: doctorDetailRequestData.user.dateOfBirth ? doctorDetailRequestData.user.dateOfBirth.toISOString() : null
            // });

            // remove unneeded keys 
            doctorDetailRequestData.user = _.omit(doctorDetailRequestData.user, 'accountId', 'gender', 'status', 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            // doctorDetailRequestData.address = _.omit(doctorDetailRequestData.address, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            // doctorDetailRequestData.contactInfo = _.omit(doctorDetailRequestData.contactInfo, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            // doctorDetailRequestData = _.omit(doctorDetailRequestData.doctor, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');

            return this._http.post(this._url + '/Doctor/add', JSON.stringify(doctorDetailRequestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((doctorData: any) => {
                    let parsedDoctor: Doctor = null;
                    parsedDoctor = DoctorAdapter.parseResponse(doctorData);
                    resolve(parsedDoctor);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Doctor>>Observable.fromPromise(promise);

    }
    updateDoctor(doctorDetail: Doctor): Observable<Doctor> {
        let promise: Promise<Doctor> = new Promise((resolve, reject) => {


            let doctorDetailRequestData = doctorDetail.toJS();

            // add/replace values which need to be changed
            // _.extend(doctorDetailRequestData.user, {
            //     userType: UserType[doctorDetailRequestData.user.userType],
            //     dateOfBirth: doctorDetailRequestData.user.dateOfBirth ? doctorDetailRequestData.user.dateOfBirth.toISOString() : null
            // });

            // remove unneeded keys 
            doctorDetailRequestData.user.doctorSpecialities = doctorDetailRequestData.doctorSpecialities;
            doctorDetailRequestData.user = _.omit(doctorDetailRequestData.user, 'accountId', 'gender', 'status', 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            doctorDetailRequestData = _.omit(doctorDetailRequestData, 'doctorSpecialities');
            // doctorDetailRequestData.address = _.omit(doctorDetailRequestData.address, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            // doctorDetailRequestData.contactInfo = _.omit(doctorDetailRequestData.contactInfo, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            // doctorDetailRequestData.doctor = _.omit(doctorDetailRequestData.doctor, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');

            return this._http.post(this._url + '/Doctor/add', JSON.stringify(doctorDetailRequestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((doctorData: any) => {
                    let parsedDoctor: Doctor = null;
                    parsedDoctor = DoctorAdapter.parseResponse(doctorData);
                    resolve(parsedDoctor);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Doctor>>Observable.fromPromise(promise);

    }
    addDoctorSpeciality(doctorDetail: DoctorSpeciality): Observable<DoctorSpeciality> {
        let promise: Promise<DoctorSpeciality> = new Promise((resolve, reject) => {


            let doctorDetailRequestData = doctorDetail.toJS();
            return this._http.post(this._url + '/DoctorSpeciality/add', JSON.stringify(doctorDetailRequestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((doctorData: any) => {
                    resolve(doctorData);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<DoctorSpeciality>>Observable.fromPromise(promise);

    }

}

