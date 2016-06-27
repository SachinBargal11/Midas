import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Subject} from "rxjs/Subject";
import {List} from 'immutable';
import {BehaviorSubject} from "rxjs/Rx";
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Notification} from '../models/notification';


@Injectable()
export class NotificationsStore {

    private _notifications: BehaviorSubject<List<Notification>> = new BehaviorSubject(List([]));
    recentlyAdded = false;
    isOpen = false;
    recentlyAddedCount = 0;
    
    constructor() {

    }

    get notifications() {
        return this._notifications.asObservable();
    }

    addNotification(notification: Notification) {
        this.recentlyAdded = this.isOpen ? false : true;
        if(!this.isOpen) {
            this.recentlyAddedCount++;
        }  
        this._notifications.next(this._notifications.getValue().push(notification));
    }

    toggleVisibility() {
        if(this.isOpen) {
            this.recentlyAddedCount = 0;
        }  
        this.isOpen = !this.isOpen;
        this.recentlyAdded = false;
              
    }

    // readAllNotifications() {
    //     let notifications = this._notifications.getValue();
    //     notifications.forEach((value) => {
    //         let index = notifications.findIndex((currentPatient: Notification) => currentPatient.title === value.title);
    //         debugger;
    //     });
    //     // notifications.merge
    //     // list = list.update(
    //     //     list.findIndex(function (item) {
    //     //         return item.get("name") === "third";
    //     //     }), function (item) {
    //     //         return item.set("count", 4);
    //     //     }
    //     // );
    //     // let notifications = this._notifications.getValue();
    //     // notifications.map((value) => {

    //     //     var test =  value.set("isRead", true);
    //     //     var test =  value.set("title", 'jhgdahsdjgasdkasdh kash dksja');
    //     //     debugger;
    //     //     return test;            
    //     // });

    //     // this._notifications.next(notifications);

    //     debugger;
    // }
}