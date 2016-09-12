import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Provider} from '../models/provider';
import {ProvidersService} from '../services/providers-service';
import {SessionStore} from './session-store';
import {Subject} from 'rxjs/Subject';
import {List} from 'immutable';
import {BehaviorSubject} from 'rxjs/Rx';
import _ from 'underscore';
import Moment from 'moment';


@Injectable()
export class ProvidersStore {

    private _providers: BehaviorSubject<List<Provider>> = new BehaviorSubject(List([]));

    constructor(
        private _providersService: ProvidersService,
        private _sessionStore: SessionStore
    ) {
        this.loadInitialData();
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._providers.next(this._providers.getValue().clear());
    }


    get providers() {
        return this._providers.asObservable();
    }

    loadInitialData(): Observable<Provider[]> {
        let promise = new Promise((resolve, reject) => {
            this._providersService.getProviders().subscribe((providers: Provider[]) => {
                this._providers.next(List(providers));
                resolve(providers);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Provider[]>>Observable.fromPromise(promise);
    }

    findProviderById(id: number) {
        let providers = this._providers.getValue();
        let index = providers.findIndex((currentProvider: Provider) => currentProvider.provider.id === id);
        return providers.get(index);
    }

    fetchProviderById(id: number): Observable<Provider> {
        let promise = new Promise((resolve, reject) => {
            let matchedProvider: Provider = this.findProviderById(id);
            if (matchedProvider) {
                resolve(matchedProvider);
            } else {
                this._providersService.getProvider(id)
                .subscribe((provider: Provider) => {
                    resolve(provider);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<Provider>>Observable.fromPromise(promise);
    }

    addProvider(providerDetail: Provider): Observable<Provider> {
        let promise = new Promise((resolve, reject) => {
            this._providersService.addProvider(providerDetail).subscribe((provider: Provider) => {
                this._providers.next(this._providers.getValue().push(provider));
                resolve(provider);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Provider>>Observable.from(promise);
    }

    updateProvider(provider: Provider): Observable<Provider> {
        // let providers = this._providers.getValue();
        // let index = providers.findIndex((currentProvider: Provider) => currentProvider.provider.id === provider.provider.id);
        let promise = new Promise((resolve, reject) => {
            this._providersService.updateProvider(provider).subscribe((currentProvider: Provider) => {
                this._providers.next(this._providers.getValue().push(provider));
                resolve(provider);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Provider>>Observable.from(promise);
    }


}