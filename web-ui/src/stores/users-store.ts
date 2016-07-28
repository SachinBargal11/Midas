import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {User} from '../models/user';
import {UsersService} from '../services/users-service';
import {Subject} from "rxjs/Subject";
import {List} from 'immutable';
import {BehaviorSubject} from "rxjs/Rx";
import _ from 'underscore';
import Moment from 'moment';

@Injectable()
export class UsersStore {

    private _users: BehaviorSubject<List<User>> = new BehaviorSubject(List([]));

    constructor(private _usersService: UsersService) {

    }

    addUser(user: User): Observable<User> {
        let promise = new Promise((resolve, reject) => {
            debugger;
            this._usersService.addUser(user).subscribe((user: User) => {
                this._users.next(this._users.getValue().push(user));
                resolve(user);
            }, error => {
                reject(error);
            });
        });
        return <Observable<User>>Observable.from(promise);
    }


}