import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { User } from '../../../commons/models/user';
import { UsersService } from '../services/users-service';
import { SessionStore } from '../../../commons/stores/session-store';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';


@Injectable()
export class UsersStore {

    private _users: BehaviorSubject<List<User>> = new BehaviorSubject(List([]));
    private _selectedUsers: BehaviorSubject<List<User>> = new BehaviorSubject(List([]));
    constructor(
        private _usersService: UsersService,
        private _sessionStore: SessionStore
    ) {
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

    get selectedUsers() {
        return this._selectedUsers.asObservable();
    }

    getUsers(): Observable<User[]> {
        let promise = new Promise((resolve, reject) => {
            this._usersService.getUsers().subscribe((users: User[]) => {
                // this._usersService.getUsers(accountId).subscribe((users: Account[]) => {
                this._users.next(List(users));
                resolve(users);
            }, error => {
                reject(error);
            });
        });
        return <Observable<User[]>>Observable.fromPromise(promise);
    }

    findUserById(id: number) {
        let users = this._users.getValue();
        let index = users.findIndex((currentUser: any) => currentUser.id === id);
        return users.get(index);
    }

    fetchUserById(id: number): Observable<User> {
        let promise = new Promise((resolve, reject) => {
            // let matchedUser: User = this.findUserById(id);
            // if (matchedUser) {
            //     resolve(matchedUser);
            // } else {
                this._usersService.getUser(id)
                    .subscribe((userDetail: User) => {
                        resolve(userDetail);
                    }, error => {
                        reject(error);
                    });
            // }
        });
        return <Observable<User>>Observable.fromPromise(promise);
    }

    fetchUserByIdAndCompnayID(id: number,companyId: number): Observable<User> {
        let promise = new Promise((resolve, reject) => {
                this._usersService.getUserByCompanyId(id,companyId)
                    .subscribe((userDetail: User) => {
                        resolve(userDetail);
                    }, error => {
                        reject(error);
                    });
            // }
        });
        return <Observable<User>>Observable.fromPromise(promise);
    }


    addUser(userDetail: User): Observable<User> {
        let promise = new Promise((resolve, reject) => {
            this._usersService.addUser(userDetail).subscribe((user: User) => {
                this._users.next(this._users.getValue().push(user));
                resolve(user);
            }, error => {
                reject(error);
            });
        });
        return <Observable<User>>Observable.from(promise);
    }
    updateUser(userDetail: User): Observable<User> {
        let promise = new Promise((resolve, reject) => {
            this._usersService.updateUser(userDetail).subscribe((updatedUserDetail: User) => {
                let userDetails: List<User> = this._users.getValue();
                let index = userDetails.findIndex((currentUser: User) => currentUser.id === updatedUserDetail.id);
                userDetails = userDetails.update(index, function () {
                    return updatedUserDetail;
                });
                this._users.next(userDetails);
                resolve(userDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<User>>Observable.from(promise);
    }
    updatePassword(userDetail: User): Observable<User> {
        let promise = new Promise((resolve, reject) => {
            this._usersService.updatePassword(userDetail).subscribe((updatedUserDetail: User) => {
                let userDetails: List<User> = this._users.getValue();
                let index = userDetails.findIndex((currentUser: User) => currentUser.id === updatedUserDetail.id);
                userDetails = userDetails.update(index, function () {
                    return updatedUserDetail;
                });
                this._users.next(userDetails);
                resolve(userDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<User>>Observable.from(promise);
    }
    deleteUser(userDetail: User): Observable<User> {
        let users = this._users.getValue();
        let index = users.findIndex((currentUser: User) => currentUser.id === userDetail.id);
        let promise = new Promise((resolve, reject) => {
            this._usersService.deleteUser(userDetail)
                .subscribe((user: User) => {
                    this._users.next(users.delete(index));
                    resolve(user);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<User>>Observable.from(promise);
    }

    selectUser(userDetail: User) {
        let selectedUsers = this._selectedUsers.getValue();
        let index = selectedUsers.findIndex((currentUser: User) => currentUser.id === userDetail.id);
        if (index < 0) {
            this._selectedUsers.next(this._selectedUsers.getValue().push(userDetail));
        }
    }

    getIsExistingUser(userName: string): Observable<any> {
        let promise = new Promise((resolve, reject) => {
            this._usersService.getIsExistingUser(userName).subscribe((user: any) => {
                resolve(user);
            }, error => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

    disassociateDoctorWithCompany(doctorId: number, companyId: number): Observable<any> {
        let promise = new Promise((resolve, reject) => {
            this._usersService.disassociateDoctorWithCompany(doctorId, companyId)
                .subscribe((data:any) => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.from(promise);
    }

    disassociateDoctorWithCompanyandAppointment(doctorId: number, companyId: number): Observable<any> {
        let promise = new Promise((resolve, reject) => {
            this._usersService.disassociateDoctorWithCompanyandAppointment(doctorId, companyId)
                .subscribe((data:any) => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.from(promise);
    }

    fetchUserByUserName(userName: string): Observable<User> {
        let promise = new Promise((resolve, reject) => {
                this._usersService.getUserByUserName(userName)
                    .subscribe((userDetail: User) => {
                        resolve(userDetail);
                    }, error => {
                        reject(error);
                    });
           
        });
        return <Observable<User>>Observable.fromPromise(promise);
    }

    mapUserToCompnay(userName: string, companyId: number, CurrentUserId: number): Observable<any> {
        let promise = new Promise((resolve, reject) => {
            this._usersService.mapUserToCompnay(userName, companyId,CurrentUserId)
                .subscribe((data:any) => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.from(promise);
    }

}