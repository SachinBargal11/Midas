import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {SubUser} from '../models/sub-user';
import {SubUsersService} from '../services/subusers-service';
import {Subject} from "rxjs/Subject";
import {List} from 'immutable';
import {BehaviorSubject} from "rxjs/Rx";
import _ from 'underscore';
import Moment from 'moment';

@Injectable()
export class SubUsersStore {

    private _subusers: BehaviorSubject<List<SubUser>> = new BehaviorSubject(List([]));

    constructor(private _subusersService: SubUsersService) {

    }

    addSubUser(subuser: SubUser): Observable<SubUser> {
        let promise = new Promise((resolve, reject) => {
            this._subusersService.addSubUser(subuser).subscribe((subuser: SubUser) => {
                this._subusers.next(this._subusers.getValue().push(subuser));
                resolve(subuser);
            }, error => {
                reject(error);
            });
        });
        return <Observable<SubUser>>Observable.from(promise);
    }


}