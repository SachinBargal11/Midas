import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {UserDetail} from '../models/user-details';
import {UsersService} from '../services/users-service';
import {Subject} from "rxjs/Subject";
import {List} from 'immutable';
import {BehaviorSubject} from "rxjs/Rx";
import _ from 'underscore';
import Moment from 'moment';

@Injectable()
export class UsersStore {

    private _users: BehaviorSubject<List<UserDetail>> = new BehaviorSubject(List([]));

    constructor(private _usersService: UsersService) {

    }

    addUser(userDetail: UserDetail): Observable<UserDetail> {
        let promise = new Promise((resolve, reject) => {
            this._usersService.addUser(userDetail).subscribe((user: UserDetail) => {
                this._users.next(this._users.getValue().push(user));
                resolve(user);
            }, error => {
                reject(error);
            });
        });
        return <Observable<UserDetail>>Observable.from(promise);
    }


}