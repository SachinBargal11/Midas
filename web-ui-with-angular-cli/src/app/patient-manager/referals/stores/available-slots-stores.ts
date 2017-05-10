import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { List } from 'immutable';
import * as _ from 'underscore';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';
import { AvailableSlotsService } from '../services/available-slots-service';
import { AvailableSlot } from '../models/available-slots';

@Injectable()
export class AvailableSlotsStore {

    private _availableSlots: BehaviorSubject<List<AvailableSlot>> = new BehaviorSubject(List([]));

    constructor(
        private _availableSlotsService: AvailableSlotsService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._availableSlots.next(this._availableSlots.getValue().clear());
    }

    get AvailableSlots() {
        return this._availableSlots.asObservable();
    }

    getAvailableSlotsByLocationAndDoctorId(locationId: Number, doctorId: Number, startDate: moment.Moment, endDate: moment.Moment): Observable<AvailableSlot[]> {
        let promise = new Promise((resolve, reject) => {
            this._availableSlotsService.getAvailableSlotsByLocationAndDoctorId(locationId, doctorId, startDate, endDate)
                .subscribe((availableSlots: AvailableSlot[]) => {
                    resolve(availableSlots);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<AvailableSlot[]>>Observable.fromPromise(promise);
    }

}

