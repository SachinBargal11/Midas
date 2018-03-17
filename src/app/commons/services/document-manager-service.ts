import { DocumentAdapter } from './adapters/document-adapter';
import { Document } from '../models/document';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { States } from '../models/states';
import { Cities } from '../models/cities';
import * as moment from 'moment';
import { DocumentTypeAdapter } from '../../account-setup/services/adapters/document-type-adapter';
import { DocumentType } from '../../account-setup/models/document-type';
import { SessionStore } from '../../commons/stores/session-store';

@Injectable()
export class DocumentManagerService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }

    mergePdfDocuments(documentIds: number[], caseId: number, mergedDocumentName: string, companyId: number): Observable<Document> {
        let promise: Promise<Document> = new Promise((resolve, reject) => {
            let requestData = {
                mergedDocumentName: mergedDocumentName,
                companyid: companyId,
                caseid: caseId,
                documentIds: documentIds,
                CreateUserId: this._sessionStore.session.user.id,
                UpdateUserId: this._sessionStore.session.user.id
              }
            return this._http.post(environment.SERVICE_BASE_URL + '/documentmanager/mergePDFs', requestData, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let document: Document = DocumentAdapter.parseResponse(data);
                    resolve(document);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Document>>Observable.fromPromise(promise);
    }
    packetDocuments(documentIds: number[], caseId: number, packetDocumentName: string, companyId: number): Observable<Document> {
        let promise: Promise<Document> = new Promise((resolve, reject) => {
            let requestData = {
                packetDocumentName: packetDocumentName,
                companyid: companyId,
                caseid: caseId,
                documentIds: documentIds
              }
            return this._http.post(environment.SERVICE_BASE_URL + '/documentmanager/packetDocuments', requestData, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let document: Document = DocumentAdapter.parseResponse(data);
                    resolve(document);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Document>>Observable.fromPromise(promise);
    }

}