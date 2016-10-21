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

    findCompanyName(companyName: string) {
        let companies = this._companies.getValue();
        let index = companies.findIndex((currentCompany: Company) => currentCompany.companyName === companyName);
        return companies.get(index);
    }

}