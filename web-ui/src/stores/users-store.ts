import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {AccountDetail} from '../models/account-details';
import {User} from '../models/user';
import {UsersService} from '../services/users-service';
import {SessionStore} from './session-store';
import {Subject} from 'rxjs/Subject';
import {List} from 'immutable';
import {BehaviorSubject} from 'rxjs/Rx';
import _ from 'underscore';
import Moment from 'moment';


@Injectable()
export class UsersStore {

    private _users: BehaviorSubject<List<AccountDetail>> = new BehaviorSubject(List([]));
    private _selectedUsers: BehaviorSubject<List<AccountDetail>> = new BehaviorSubject(List([]));
    constructor(
        private _usersService: UsersService,
        private _sessionStore: SessionStore
    ) {
        this.loadInitialData();
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._users.next(this._users.getValue().clear());
    }


    get users() {
        return this._users.asObservable();
    }

    get selectedUsers(){
        return this._selectedUsers.asObservable();
    }

    loadInitialData(): Observable<AccountDetail[]> {
        let accountId: number = this._sessionStore.session.account_id;
        let promise = new Promise((resolve, reject) => {
            this._usersService.getUsers(accountId).subscribe((users: AccountDetail[]) => {
                this._users.next(List(users));
                resolve(users);
            }, error => {
                reject(error);
            });
        });
        return <Observable<AccountDetail[]>>Observable.fromPromise(promise);
    }

      findUserById(id: number) {
        let users = this._users.getValue();
        let index = users.findIndex((currentUser: AccountDetail) => currentUser.user.id === id);
        return users.get(index);
    }

    fetchUserById(id: number): Observable<AccountDetail> {
        let promise = new Promise((resolve, reject) => {
            let matchedUser: AccountDetail = this.findUserById(id);
            if (matchedUser) {
                resolve(matchedUser);
            } else {
                this._usersService.getUser(id)
                .subscribe((userDetail: AccountDetail) => {
                    resolve(userDetail);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<AccountDetail>>Observable.fromPromise(promise);
    }


    addUser(userDetail: AccountDetail): Observable<AccountDetail> {
        let promise = new Promise((resolve, reject) => {
            this._usersService.addUser(userDetail).subscribe((user: AccountDetail) => {
                this._users.next(this._users.getValue().push(user));
                resolve(user);
            }, error => {
                reject(error);
            });
        });
        return <Observable<AccountDetail>>Observable.from(promise);
    }
    updateUser(userDetail: AccountDetail): Observable<AccountDetail> {
        let users = this._users.getValue();
        let index = users.findIndex((currentUser: AccountDetail) => currentUser.user.id === userDetail.user.id);
        let promise = new Promise((resolve, reject) => {
            this._usersService.updateUser(userDetail).subscribe((userDetail: AccountDetail) => {
                this._users.next(this._users.getValue().push(userDetail));
                resolve(userDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<AccountDetail>>Observable.from(promise);
    }
    updatePassword(userDetail: AccountDetail): Observable<AccountDetail> {
        let users = this._users.getValue();
        let index = users.findIndex((currentUser: AccountDetail) => currentUser.user.id === userDetail.user.id);
        let promise = new Promise((resolve, reject) => {
            this._usersService.updatePassword(userDetail).subscribe((userDetail: AccountDetail) => {
                this._users.next(this._users.getValue().push(userDetail));
                resolve(userDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<AccountDetail>>Observable.from(promise);
    }

    selectUser(userDetail: AccountDetail) {
        let selectedUsers = this._selectedUsers.getValue();
        let index = selectedUsers.findIndex((currentUser: AccountDetail) => currentUser.user.id === userDetail.user.id);
        if (index < 0) {
            this._selectedUsers.next(this._selectedUsers.getValue().push(userDetail));
        }
    }

}