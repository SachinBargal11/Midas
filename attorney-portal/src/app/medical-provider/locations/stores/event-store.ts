import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { MyEvent } from '../models/my-event';
import { EventService } from '../services/event-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';

@Injectable()
export class EventStore {

    private _events: BehaviorSubject<List<MyEvent>> = new BehaviorSubject(List([]));

    constructor(
        private _eventsService: EventService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    get events() {
        return this._events.asObservable();
    }

    getEvents(): Observable<MyEvent[]> {
        let promise = new Promise((resolve, reject) => {
            this._eventsService.getEvents().subscribe((events: MyEvent[]) => {
                this._events.next(List(events));
                resolve(events);
            }, error => {
                reject(error);
            });
        });
        return <Observable<MyEvent[]>>Observable.fromPromise(promise);
    }

    findEventById(id: number) {
        let events = this._events.getValue();
        let index = events.findIndex((currentEvent: MyEvent) => currentEvent.id === id);
        return events.get(index);
    }

    fetchEventById(id: number): Observable<MyEvent> {
        let promise = new Promise((resolve, reject) => {
            let matchedEvent: MyEvent = this.findEventById(id);
            if (matchedEvent) {
                resolve(matchedEvent);
            } else {
                this._eventsService.getEvent(id).subscribe((event: MyEvent) => {
                    resolve(event);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<MyEvent>>Observable.fromPromise(promise);
    }

    addEvent(event: MyEvent): Observable<MyEvent> {
        let promise = new Promise((resolve, reject) => {
            this._eventsService.addEvent(event).subscribe((event: MyEvent) => {
                this._events.next(this._events.getValue().push(event));
                resolve(event);
            }, error => {
                reject(error);
            });
        });
        return <Observable<MyEvent>>Observable.from(promise);
    }
    updateEvent(event: MyEvent): Observable<MyEvent> {
        let promise = new Promise((resolve, reject) => {
            this._eventsService.updateEvent(event).subscribe((updatedEvent: MyEvent) => {
                let event: List<MyEvent> = this._events.getValue();
                let index = event.findIndex((currentEvent: MyEvent) => currentEvent.id === updatedEvent.id);
                event = event.update(index, function () {
                    return updatedEvent;
                });
                this._events.next(event);
                resolve(event);
            }, error => {
                reject(error);
            });
        });
        return <Observable<MyEvent>>Observable.from(promise);
    }
    deleteEvent(event: MyEvent) {
        let events = this._events.getValue();
        let index = events.findIndex((currentEvent: MyEvent) => currentEvent.id === event.id);
        let promise = new Promise((resolve, reject) => {
            this._eventsService.deleteEvent(event)
                .subscribe((event: MyEvent) => {
                    this._events.next(events.delete(index));
                    resolve(event);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<MyEvent>>Observable.from(promise);
    }

    resetStore() {
        this._events.next(this._events.getValue().clear());
    }
}
