import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {States} from '../models/states';
import {StateService} from '../services/state-service';
import {SessionStore} from './session-store';
import {Subject} from "rxjs/Subject";
import {List} from 'immutable';
import {BehaviorSubject} from "rxjs/Rx";
import _ from 'underscore';
import Moment from 'moment';


@Injectable()
export class StatesStore {

    private _states: BehaviorSubject<List<States>> = new BehaviorSubject(List([]));

    constructor(
        private _statesService: StateService
    ) {
        
    }

    get states() {
        return this._states.asObservable();
    }

    getStates() {
        let promise = new Promise((resolve, reject) => {
            this._statesService.getStates().subscribe((states: States[]) => {
                this._states.next(List(states));
                resolve(states);
            }, error => {
                reject(error);
            });
        });
    }
}