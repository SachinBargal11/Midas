import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Company} from '../models/company';
import {AuthenticationService} from '../services/authentication-service';
import {SessionStore} from './session-store';
import {List} from 'immutable';
import {BehaviorSubject} from 'rxjs/Rx';


@Injectable()
export class CompanyStore {
companyName: any[];
email: any[];
    private _companies: BehaviorSubject<List<Company>> = new BehaviorSubject(List([]));
   constructor(
        private _authenticationService: AuthenticationService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._companies.next(this._companies.getValue().clear());
    }


    get companies() {
        return this._companies.asObservable();
    }

    getCompanies(): Observable<Company[]> {
        let promise = new Promise((resolve, reject) => {
            this._authenticationService.getCompanies().subscribe((companies: Company[]) => {
                this._companies.next(List(companies));
                resolve(companies);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Company[]>>Observable.fromPromise(promise);
    }
    // getCompanyNames() {
    //     let companyName: any[];
    //     let email: any[];
    //     this._authenticationService.getCompanies()
    //              .subscribe(
    //             (company: Company[]) => {
    //                 function getFields(input, field) {
    //                     let output = [];
    //                     for (let i = 0; i < input.length ; ++i)
    //                         output.push(input[i][field]);
    //                     return output;
    //                 }
    //                  companyName = getFields(company, 'companyName');
    //                  email = getFields(company, 'email');
    //                  return companyName;
    //             },
    //             () => {
    //             });
    //             return companyName;
    // }

 getCompanyNames() {
    this.getCompanies();
    return this._authenticationService.companies;
}
}