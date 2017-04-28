import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { MedicalProviderMaster } from '../models/medical-provider-master';
import { MedicalProviderMasterService } from '../services/medical-provider-master-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../commons/stores/session-store';


@Injectable()
export class MedicalProviderMasterStore {

    private _medicalProviderMaster: BehaviorSubject<List<MedicalProviderMaster>> = new BehaviorSubject(List([]));

    constructor(
        private _medicalProviderMasterService: MedicalProviderMasterService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }
    resetStore() {
        this._medicalProviderMaster.next(this._medicalProviderMaster.getValue().clear());
    }
    
}
