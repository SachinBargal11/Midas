import { ScheduledEventAdapter } from '../../locations/services/adapters/scheduled-event-adapter';
import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import * as RRule from 'rrule';
import * as moment from 'moment';

@Injectable()
export class ScheduledEventService {
    private _url: string = 'http://localhost:3004/events';
    private _headers: Headers = new Headers();

    constructor(private _http: Http) {
        this._headers.append('Content-Type', 'application/json');
    }

    getEvents(): Observable<ScheduledEvent[]> {
        let promise: Promise<ScheduledEvent[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let events: ScheduledEvent[];
                    if (data) {
                        events = (<Object[]>data).map((eventData: any) => {
                            return ScheduledEventAdapter.parseResponse(eventData);
                        });
                    }
                    resolve(events);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<ScheduledEvent[]>>Observable.fromPromise(promise);
    }
    addEvent(event: ScheduledEvent): Observable<ScheduledEvent> {
        let promise: Promise<ScheduledEvent> = new Promise((resolve, reject) => {
            let requestData = _.extend(event.toJS(), {
                recurrenceRule: event.recurrenceRule ? event.recurrenceRule.toString() : '',
                recurrenceException: ''
            });
            requestData = _.omit(requestData, 'transportProviderId');
            return this._http.post(this._url, JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    if (data) {
                        let addedEvent: ScheduledEvent = null;
                        addedEvent = ScheduledEventAdapter.parseResponse(data);
                        resolve(addedEvent);
                    }
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<ScheduledEvent>>Observable.fromPromise(promise);
    }
    updateEvent(event: ScheduledEvent): Observable<ScheduledEvent> {
        let promise = new Promise((resolve, reject) => {
            let requestData = _.extend(event.toJS(), {
                recurrenceRule: event.recurrenceRule ? event.recurrenceRule.toString() : '',
                recurrenceException: _.map(event.recurrenceException, (datum: moment.Moment) => {
                    return datum.format('YYYYMMDDThhmmss') + 'Z';
                }).join(',')
            });
            requestData = _.omit(requestData, 'transportProviderId');

            return this._http.put(`${this._url}/${event.id}`, JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let updatedEvent: ScheduledEvent = null;
                    updatedEvent = ScheduledEventAdapter.parseResponse(data);
                    resolve(updatedEvent);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<ScheduledEvent>>Observable.fromPromise(promise);
    }
    deleteEvent(event: ScheduledEvent): Observable<ScheduledEvent> {
        let promise = new Promise((resolve, reject) => {
            return this._http.delete(`${this._url}/${event.id}`)
                .map(res => res.json())
                .subscribe((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<ScheduledEvent>>Observable.from(promise);
    }
}
