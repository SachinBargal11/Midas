import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import { ScheduledEventService } from '../services/scheduled-event-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';

@Injectable()
export class ScheduledEventStore {

    private _events: BehaviorSubject<List<ScheduledEvent>> = new BehaviorSubject(List([]));

    constructor(
        private _scheduledEventsService: ScheduledEventService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    get events() {
        return this._events.asObservable();
    }

    getEvents(): Observable<ScheduledEvent[]> {
        let promise = new Promise((resolve, reject) => {
            this._scheduledEventsService.getEvents().subscribe((events: ScheduledEvent[]) => {
                this._events.next(List(events));
                resolve(events);
            }, error => {
                reject(error);
            });
        });
        return <Observable<ScheduledEvent[]>>Observable.fromPromise(promise);
    }

    findEventById(id: number) {
        let events = this._events.getValue();
        let index = events.findIndex((currentEvent: ScheduledEvent) => currentEvent.id === id);
        return events.get(index);
    }

    addEvent(event: ScheduledEvent): Observable<ScheduledEvent> {
        let promise = new Promise((resolve, reject) => {
            this._scheduledEventsService.addEvent(event).subscribe((event: ScheduledEvent) => {
                this._events.next(this._events.getValue().push(event));
                resolve(event);
            }, error => {
                reject(error);
            });
        });
        return <Observable<ScheduledEvent>>Observable.from(promise);
    }
    updateEvent(event: ScheduledEvent): Observable<ScheduledEvent> {
        let promise = new Promise((resolve, reject) => {
            this._scheduledEventsService.updateEvent(event).subscribe((updatedEvent: ScheduledEvent) => {
                let event: List<ScheduledEvent> = this._events.getValue();
                let index = event.findIndex((currentEvent: ScheduledEvent) => currentEvent.id === updatedEvent.id);
                event = event.update(index, function () {
                    return updatedEvent;
                });
                this._events.next(event);
                resolve(event);
            }, error => {
                reject(error);
            });
        });
        return <Observable<ScheduledEvent>>Observable.from(promise);
    }
    deleteEvent(event: ScheduledEvent) {
        let events = this._events.getValue();
        let index = events.findIndex((currentEvent: ScheduledEvent) => currentEvent.id === event.id);
        let promise = new Promise((resolve, reject) => {
            this._scheduledEventsService.deleteEvent(event)
                .subscribe((event: ScheduledEvent) => {
                    this._events.next(events.delete(index));
                    resolve(event);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<ScheduledEvent>>Observable.from(promise);
    }

    resetStore() {
        this._events.next(this._events.getValue().clear());
    }
}
