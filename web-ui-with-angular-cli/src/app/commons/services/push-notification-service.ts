import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import * as _ from 'underscore';
import { environment } from '../../../environments/environment';
import { SessionStore } from '../../commons/stores/session-store';
import { Procedure } from '../models/procedure';
import { ProcedureAdapter } from './adapters/procedure-adapter';


@Injectable()
export class PushNotificationService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }

    getSubscriptionByUsernameAndEventId(userName: string, eventId: number): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            return this._http.get('http://192.168.0.128/CANotificationService/NotificationManager/GetSubscription?applicationName=Midas&username=' + userName + '&eventid=' + eventId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    // let procedures = (<Object[]>data).map((data: any) => {
                    //     return ProcedureAdapter.parseResponse(data);
                    // });
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    getAllGroupEventsByGroupId(): Observable<any[]> {
        let promise: Promise<any[]> = new Promise((resolve, reject) => {
            return this._http.get('http://192.168.0.128/CANotificationService/NotificationManager/GetGroupEventsByGroupID?groupid=2', {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    // let procedures = (<Object[]>data).map((data: any) => {
                    //     return ProcedureAdapter.parseResponse(data);
                    // });
                    // resolve(procedures);
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any[]>>Observable.fromPromise(promise);
    }
    getAllGroupEvents(): Observable<any[]> {
        let promise: Promise<any[]> = new Promise((resolve, reject) => {
            return this._http.get('http://192.168.0.128/CANotificationService/NotificationManager/GetGroupEvents?applicationName=Midas&groupname=Medical Provider', {
                // headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    // let procedures = (<Object[]>data).map((data: any) => {
                    //     return ProcedureAdapter.parseResponse(data);
                    // });
                    // resolve(procedures);
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any[]>>Observable.fromPromise(promise);
    }
    getAllMessages(userName: string): Observable<any[]> {
        let promise: Promise<any[]> = new Promise((resolve, reject) => {
            return this._http.get('http://192.168.0.128/CANotificationService/NotificationManager/GetMessages?applicationName=Midas&username=' + userName, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    // let procedures = (<Object[]>data).map((data: any) => {
                    //     return ProcedureAdapter.parseResponse(data);
                    // });
                    // resolve(procedures);
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any[]>>Observable.fromPromise(promise);
    }
    getApplicationEvents(userName: string): Observable<any[]> {
        let promise: Promise<any[]> = new Promise((resolve, reject) => {
            return this._http.get('http://192.168.0.128/CANotificationService/NotificationManager/GetApplicationEvents?applicationName=Midas', {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    // let procedures = (<Object[]>data).map((data: any) => {
                    //     return ProcedureAdapter.parseResponse(data);
                    // });
                    // resolve(procedures);
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any[]>>Observable.fromPromise(promise);
    }

    subscribeEvents(eventIds: number[]): Observable<any[]> {
        // let userName = this._sessionStore.session.user.userName;
        let userName = 'bajpai.adarsh@gmail.com';
        let requestData = {
            applicationName: 'Midas',
            username: userName,
            eventids: eventIds
        }
        let promise: Promise<any[]> = new Promise((resolve, reject) => {
            // return this._http.post('http://192.168.0.128/CANotificationService/NotificationManager/SubscribeEvents', JSON.stringify(requestData), {
            return this._http.post('http://192.168.0.128/CANotificationService/NotificationManager/SubscribeEvents' + '?' +
                'applicationName=' + 'Midas' + '&' +
                'username=' + encodeURI(userName) + '&' +
                'eventids=' + '[' + _.forEach(eventIds, (currId: any) => { encodeURI(currId) }) + ']',
                {
                    // headers: this._headers
                })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any[]>>Observable.fromPromise(promise);
    }


}

