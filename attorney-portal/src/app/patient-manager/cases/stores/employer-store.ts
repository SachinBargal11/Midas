import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Employer } from '../models/employer';
import { EmployerService } from '../services/employer-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';

@Injectable()
export class EmployerStore {

    private _employers: BehaviorSubject<List<Employer>> = new BehaviorSubject(List([]));

    constructor(
        private _employerService: EmployerService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    get employers() {
        return this._employers.asObservable();
    }

    getEmployers(patientId: Number): Observable<Employer[]> {
        let promise = new Promise((resolve, reject) => {
            this._employerService.getEmployers(patientId).subscribe((employers: Employer[]) => {
                this._employers.next(List(employers));
                resolve(employers);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Employer[]>>Observable.fromPromise(promise);
    }

   
      getCurrentEmployer(caseId: Number): Observable<Employer> {
        let promise = new Promise((resolve, reject) => {
            this._employerService.getCurrentEmployer(caseId).subscribe((employer: Employer) => {
                resolve(employer);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Employer>>Observable.fromPromise(promise);
    }


    findEmployerById(id: number) {
        let employers = this._employers.getValue();
        let index = employers.findIndex((currentEmployer: Employer) => currentEmployer.id === id);
        return employers.get(index);
    }

    fetchEmployerById(id: number): Observable<Employer> {
        let promise = new Promise((resolve, reject) => {
            let matchedEmployer: Employer = this.findEmployerById(id);
            if (matchedEmployer) {
                resolve(matchedEmployer);
            } else {
                this._employerService.getEmployer(id).subscribe((employer: Employer) => {
                    resolve(employer);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<Employer>>Observable.fromPromise(promise);
    }

    addEmployer(employer: Employer): Observable<Employer> {
        let promise = new Promise((resolve, reject) => {
            this._employerService.addEmployer(employer).subscribe((employer: Employer) => {
                this._employers.next(this._employers.getValue().push(employer));
                resolve(employer);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Employer>>Observable.from(promise);
    }
    updateEmployer(employer: Employer, empId: number): Observable<Employer> {
        let promise = new Promise((resolve, reject) => {
            this._employerService.updateEmployer(employer, empId).subscribe((updatedEmployer: Employer) => {
                let employer: List<Employer> = this._employers.getValue();
                let index = employer.findIndex((currentEmployer: Employer) => currentEmployer.id === updatedEmployer.id);
                employer = employer.update(index, function () {
                    return updatedEmployer;
                });
                this._employers.next(employer);
                resolve(employer);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Employer>>Observable.from(promise);
    }
    deleteEmployer(employer: Employer) {
        let employers = this._employers.getValue();
        let index = employers.findIndex((currentEmployer: Employer) => currentEmployer.id === employer.id);
        let promise = new Promise((resolve, reject) => {
            this._employerService.deleteEmployer(employer)
                .subscribe((employer: Employer) => {
                    this._employers.next(employers.delete(index));
                    resolve(employer);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<Employer>>Observable.from(promise);
    }

    resetStore() {
        this._employers.next(this._employers.getValue().clear());
    }
}
