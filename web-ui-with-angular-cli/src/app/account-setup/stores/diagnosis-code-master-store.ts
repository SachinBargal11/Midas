import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import { DiagnosisCode } from '../../commons/models/diagnosis-code';
import { DiagnosisCodeMasterService } from '../services/diagnosis-code-master-service';
import { SessionStore } from '../../commons/stores/session-store';


@Injectable()
export class DiagnosisCodeMasterStore {

    private _diagnosisCode: BehaviorSubject<List<DiagnosisCode>> = new BehaviorSubject(List([]));

    constructor(
        private _diagnosisCodeMasterService: DiagnosisCodeMasterService,

        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }
    resetStore() {
        this._diagnosisCode.next(this._diagnosisCode.getValue().clear());
    }

    getDiagnosisCodeByCompanyId(companyId: number): Observable<DiagnosisCode[]> {
        let promise = new Promise((resolve, reject) => {
            this._diagnosisCodeMasterService.getDiagnosisCodeByCompanyId(companyId).subscribe((diagnosisCodes: DiagnosisCode[]) => {
                resolve(diagnosisCodes);
            }, error => {
                reject(error);
            });
        });
        return <Observable<DiagnosisCode[]>>Observable.fromPromise(promise);
    }

    getDiagnosisCodesByCompanyAndDiagnosisType(companyId: number, diagnosisTypeCompnayID: number): Observable<DiagnosisCode[]> {
        let promise = new Promise((resolve, reject) => {
            this._diagnosisCodeMasterService.getDiagnosisCodesByCompanyAndDiagnosisType(companyId, diagnosisTypeCompnayID).subscribe((diagnosisCodes: DiagnosisCode[]) => {
                resolve(diagnosisCodes);
            }, error => {
                reject(error);
            });
        });
        return <Observable<DiagnosisCode[]>>Observable.fromPromise(promise);
    }

    saveDiagnosisCodesToCompnay(selDiagnosis: DiagnosisCode[]): Observable<DiagnosisCode[]> {
        let promise = new Promise((resolve, reject) => {
            this._diagnosisCodeMasterService.saveDiagnosisCodesToCompnay(selDiagnosis).subscribe((selDiagnosis: DiagnosisCode[]) => {
                _.forEach(selDiagnosis, (diag: DiagnosisCode) => {
                    this._diagnosisCode.next(this._diagnosisCode.getValue().push(diag));
                });
                resolve(selDiagnosis);
            }, error => {
                reject(error);
            });
        });
        return <Observable<DiagnosisCode[]>>Observable.from(promise);
    }

    deleteDiagnosisCodeMapping(diagnosisCode: DiagnosisCode) : Observable<DiagnosisCode> {
        let diagnosisCodesMap = this._diagnosisCode.getValue();
        let index = diagnosisCodesMap.findIndex((currentdiagnosisCodeMapping: DiagnosisCode) => currentdiagnosisCodeMapping.id === diagnosisCode.id);
        let promise = new Promise((resolve, reject) => {
            this._diagnosisCodeMasterService.deleteDiagnosisCodeMapping(diagnosisCode).subscribe((diagnosisCode: DiagnosisCode) => {
                    this._diagnosisCode.next(diagnosisCodesMap.delete(index));
                    resolve(diagnosisCode);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<DiagnosisCode>>Observable.from(promise);
    }
}