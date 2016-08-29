import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import _ from 'underscore';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import Environment from '../scripts/environment';
import {Doctor} from '../models/doctor';
import {DoctorDetail} from '../models/doctor-details';
import {SessionStore} from '../stores/session-store';
import {DoctorAdapter} from './adapters/doctor-adapter';
import {UserType} from '../models/enums/UserType';

@Injectable()
export class DoctorsService {

    private _url: string = `${Environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getDoctor(doctorId: Number): Observable<DoctorDetail> {
        let promise: Promise<DoctorDetail> = new Promise((resolve, reject) => {
            return this._http.get(this._url + "/Doctor/Get/" + doctorId).map(res => res.json())
                .subscribe((data: any) => {
                    let doctor = null;
                    if (data.length) {
                        doctor = DoctorAdapter.parseResponse(data[0]);
                        resolve(doctor);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<DoctorDetail>>Observable.fromPromise(promise);
    }
    getDoctors(): Observable<DoctorDetail[]> {
        let promise: Promise<DoctorDetail[]> = new Promise((resolve, reject) => {
            return this._http.post(this._url + "/Doctor/GetAll", JSON.stringify({ "doctor": [{}] }), {
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
        return <Observable<DoctorDetail[]>>Observable.fromPromise(promise);
    }

    addDoctor(doctorDetail: DoctorDetail): Observable<DoctorDetail> {
        let promise: Promise<DoctorDetail> = new Promise((resolve, reject) => {


            let doctorDetailRequestData = doctorDetail.toJS();

            // add/replace values which need to be changed
            _.extend(doctorDetailRequestData.user, {
                userType: UserType[doctorDetailRequestData.user.userType],
                dateOfBirth: doctorDetailRequestData.user.dateOfBirth ? doctorDetailRequestData.user.dateOfBirth.toISOString() : null
            });

            // remove unneeded keys 
            doctorDetailRequestData.user = _.omit(doctorDetailRequestData.user, 'accountId', 'gender', 'status', 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            doctorDetailRequestData.address = _.omit(doctorDetailRequestData.address, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            doctorDetailRequestData.contactInfo = _.omit(doctorDetailRequestData.contactInfo, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            doctorDetailRequestData.doctor = _.omit(doctorDetailRequestData.doctor, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');

            return this._http.post(this._url + '/Doctor/Add', JSON.stringify(doctorDetailRequestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((doctorData: any) => {
                    let parsedDoctor: DoctorDetail = null;
                    parsedDoctor = DoctorAdapter.parseResponse(doctorData);
                    resolve(parsedDoctor);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<DoctorDetail>>Observable.fromPromise(promise);

    }
    updateDoctor(doctorDetail: DoctorDetail): Observable<DoctorDetail> {
        let promise: Promise<DoctorDetail> = new Promise((resolve, reject) => {


            let doctorDetailRequestData = doctorDetail.toJS();

            // add/replace values which need to be changed
            _.extend(doctorDetailRequestData.user, {
                userType: UserType[doctorDetailRequestData.user.userType],
                dateOfBirth: doctorDetailRequestData.user.dateOfBirth ? doctorDetailRequestData.user.dateOfBirth.toISOString() : null
            });

            // remove unneeded keys 
            doctorDetailRequestData.user = _.omit(doctorDetailRequestData.user, 'accountId', 'gender', 'status', 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            doctorDetailRequestData.address = _.omit(doctorDetailRequestData.address, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            doctorDetailRequestData.contactInfo = _.omit(doctorDetailRequestData.contactInfo, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            doctorDetailRequestData.doctor = _.omit(doctorDetailRequestData.doctor, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');

            return this._http.post(this._url + '/Doctor/Add', JSON.stringify(doctorDetailRequestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((doctorData: any) => {
                    let parsedDoctor: DoctorDetail = null;
                    parsedDoctor = DoctorAdapter.parseResponse(doctorData);
                    resolve(parsedDoctor);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<DoctorDetail>>Observable.fromPromise(promise);

    }

}

