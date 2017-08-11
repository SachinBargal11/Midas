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
import { PushNotification } from '../models/push-notification';
import { PushNotificationAdapter } from '../services/adapters/push-notification-adapter';


@Injectable()
export class PushNotificationService {

    // private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _url: string = 'http://caserver:7011';
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }

    loadNotifictionHub(accessToken) {
        $.connection.hub.qs = { 'access_token': accessToken, 'application_name': 'Midas' };
        $.connection.hub.url = this._url + '/signalr';
        $.connection.hub.logging = true;
        var notificationHub = $.connection.hub.proxies['notificationhub'];
        let promise: Promise<any> = new Promise((resolve, reject) => {
            return notificationHub.client.refreshNotification = (data: PushNotification[]) => {
                let notifications = _.map(data, (currData: any) => {
                    return PushNotificationAdapter.parseResponse(currData);
                });
                resolve(notifications);
            }, (error) => {
                reject(error);
            }
        });
        $.connection.hub.start().done(function () {
            console.log('Notification hub started');
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

    getSubscriptionByUsernameAndEventId(userName: string, eventId: number): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/NotificationManager/GetSubscription?applicationName=Midas&username=' + userName + '&eventid=' + eventId, {
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
            return this._http.get(this._url + '/NotificationManager/GetGroupEventsByGroupID?groupid=2', {
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
            return this._http.get(this._url + '/NotificationManager/GetGroupEvents?applicationName=Midas&groupname=Medical Provider', {
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
            return this._http.get(this._url + '/NotificationManager/GetMessages?applicationName=Midas&username=' + userName, {
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
            return this._http.get(this._url + '/NotificationManager/GetApplicationEvents?applicationName=Midas', {
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
    testAPI(): Observable<any[]> {
        let promise: Promise<any[]> = new Promise((resolve, reject) => {
            return this._http.get('http://192.168.0.128/SampleWebAPI/identity', {
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
        let userName = this._sessionStore.session.user.userName;
        // let userName = 'bajpai.adarsh@gmail.com';
        let requestData = {
            ApplicationName: 'Midas',
            UserName: userName,
            EventIDs: eventIds
        }
        let promise: Promise<any[]> = new Promise((resolve, reject) => {
            return this._http.post(this._url + '/NotificationManager/SubscribeEvents', JSON.stringify(requestData), {
                headers: this._headers
            })
                // return this._http.post('http://192.168.0.128/CANotificationService/NotificationManager/SubscribeEvents' + '?' +
                //     'applicationName=' + 'Midas' + '&' +
                //     'username=' + encodeURI(userName) + '&' +
                //     'eventids=' + '[' + _.forEach(eventIds, (currId: any) => { encodeURI(currId) }) + ']',
                //     {
                //     headers: this._headers
                // })
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

