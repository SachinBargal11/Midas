import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { DocumentTypeService } from '../services/document-type-service';
import { DocumentType } from '../models/document-type';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../commons/stores/session-store';
import { Account } from '../../account/models/account';

@Injectable()
export class DocumentTypeStore {

    private _documentType: BehaviorSubject<List<DocumentType>> = new BehaviorSubject(List([]));
    // private _allProvidersInMidas: BehaviorSubject<List<Account>> = new BehaviorSubject(List([]));

    constructor(
        private _documentTypeService: DocumentTypeService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }
    resetStore() {
        this._documentType.next(this._documentType.getValue().clear());
    }

    get DocumentType() {
        return this._documentType.asObservable();
    }

    getDocumentObjectType(companyId: Number, currentId: number): Observable<DocumentType[]> {
        let promise = new Promise((resolve, reject) => {
            this._documentTypeService.getDocumentObjectType(companyId, currentId)
                .subscribe((documentType: DocumentType[]) => {
                    // this._medicalProviderMaster.next(List(Provider));
                    resolve(documentType);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<DocumentType[]>>Observable.fromPromise(promise);
    }

    addDocument(documentType: DocumentType): Observable<DocumentType> {
        let promise = new Promise((resolve, reject) => {
            this._documentTypeService.addDocument(documentType).subscribe((documentType: DocumentType) => {
                // this._documentType.next(this._documentType.getValue().push(documentType));
                resolve(documentType);
            }, error => {
                reject(error);
            });
        });
        return <Observable<DocumentType>>Observable.from(promise);
    }

    deleteDocument(documentType: DocumentType) {
        let documentTypes = this._documentType.getValue();
        let index = documentTypes.findIndex((currentDocumentType: DocumentType) => currentDocumentType.id === documentType.id);
        let promise = new Promise((resolve, reject) => {
            this._documentTypeService.deleteDocument(documentType)
                .subscribe((documentType: DocumentType) => {
                    this._documentType.next(documentTypes.delete(index));
                    resolve(documentType);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<DocumentType>>Observable.from(promise);
    }
}

