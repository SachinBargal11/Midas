import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { SessionStore } from './session-store';
import { PushNotification } from '../models/push-notification';
import { PushNotificationEvent } from '../models/push-notification-event';
import { PushNotificationService } from '../services/push-notification-service';


@Injectable()
export class PushNotificationStore {
    private _pushNotification: BehaviorSubject<List<PushNotification>> = new BehaviorSubject(List([]));
    private _pushNotificationEvent: BehaviorSubject<List<PushNotificationEvent>> = new BehaviorSubject(List([]));

    constructor(
        private _pushNotificationService: PushNotificationService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._pushNotification.next(this._pushNotification.getValue().clear());
        this._pushNotificationEvent.next(this._pushNotificationEvent.getValue().clear());
    }

    getPushNotificationById(accessToken): Observable<any> {
        let promise = new Promise((resolve, reject) => {
            this._pushNotificationService.loadNotifictionHub(accessToken).subscribe((PushNotification: any) => {
                resolve(PushNotification);
            }, error => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    updateMessageStatus(): Observable<any> {
        let promise = new Promise((resolve, reject) => {
            this._pushNotificationService.updateMessageStatus().subscribe((PushNotification: any) => {
                resolve(PushNotification);
            }, error => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    getSavedSubscriptionsByUsername(userName: string): Observable<any> {
        let promise = new Promise((resolve, reject) => {
            this._pushNotificationService.getSavedSubscriptionsByUsername(userName).subscribe((PushNotification: any) => {
                resolve(PushNotification);
            }, error => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    getSubscriptionByUsernameAndEventId(userName: string, eventId: number): Observable<any> {
        let promise = new Promise((resolve, reject) => {
            this._pushNotificationService.getSubscriptionByUsernameAndEventId(userName, eventId).subscribe((PushNotification: any) => {
                resolve(PushNotification);
            }, error => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    getAllGroupEventsByGroupId(): Observable<any> {
        let promise = new Promise((resolve, reject) => {
            this._pushNotificationService.getAllGroupEventsByGroupId().subscribe((PushNotification: any) => {
                resolve(PushNotification);
            }, error => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    getAllGroupEvents(): Observable<any> {
        let promise = new Promise((resolve, reject) => {
            this._pushNotificationService.getAllGroupEvents().subscribe((PushNotification: any) => {
                resolve(PushNotification);
            }, error => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    getAllMessages(userName: string): Observable<any> {
        let promise = new Promise((resolve, reject) => {
            this._pushNotificationService.getAllMessages(userName).subscribe((PushNotification: any) => {
                resolve(PushNotification);
            }, error => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    getApplicationEvents(userName: string): Observable<any> {
        let promise = new Promise((resolve, reject) => {
            this._pushNotificationService.getApplicationEvents(userName).subscribe((PushNotification: any) => {
                resolve(PushNotification);
            }, error => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    subscribeEvents(eventIds: number[]): Observable<any> {
        let promise = new Promise((resolve, reject) => {
            this._pushNotificationService.subscribeEvents(eventIds).subscribe((PushNotification: any) => {
                resolve(PushNotification);
            }, error => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
}

