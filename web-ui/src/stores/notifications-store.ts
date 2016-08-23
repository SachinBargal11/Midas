import {Injectable, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Subject} from 'rxjs/Subject';
import {List} from 'immutable';
import {BehaviorSubject} from 'rxjs/Rx';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Notification} from '../models/notification';
import {SessionStore} from './session-store';


@Injectable()
export class NotificationsStore {

    _notifications: BehaviorSubject<List<Notification>> = new BehaviorSubject(List([]));
    recentlyAdded = false;
    isOpen = false;
    recentlyAddedCount = 0;

    constructor(
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._notifications.next(this._notifications.getValue().clear());
        this.recentlyAdded = false;
        this.isOpen = false;
        this.recentlyAddedCount = 0;
    }

    get notifications() {
        return this._notifications.asObservable();
    }

    addNotification(notification: Notification) {
        this.readAllNotifications();
        this.recentlyAddedCount = 0;
        this.recentlyAdded = this.isOpen ? false : true;
        this.recentlyAddedCount++;
        if (this.isOpen) {
            setTimeout(() => {
                this.recentlyAddedCount = 0;
                this.readAllNotifications();
            }, 3000);
        }
        this._notifications.next(this._notifications.getValue().push(notification));
    }

    toggleVisibility() {
        if (this.isOpen) {
            this.recentlyAddedCount = 0;
            this.readAllNotifications();
        }
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            setTimeout(() => {
                this.recentlyAddedCount = 0;
                this.readAllNotifications();
            }, 3000);
        }
        this.recentlyAdded = false;
    }

    readAllNotifications() {
        let notifications: List<Notification> = this._notifications.getValue();
        notifications = notifications.toSeq().map((item: Notification) => {
            return <Notification>item.set('isRead', true);
        }).toList();
        this._notifications.next(notifications);
    }
}