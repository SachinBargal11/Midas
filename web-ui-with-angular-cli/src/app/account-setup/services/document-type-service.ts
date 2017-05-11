import * as Debugger from '_debugger';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { DocumentTypeAdapter } from './adapters/document-type-adapter';
import { DocumentType } from '../models/document-type';
import { Document } from '../models/enum/document';


@Injectable()
export class DocumentTypeService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getDocumentObjectType(companyId: Number, currentId: number): Observable<DocumentType[]> {
        let promise: Promise<DocumentType[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/DocumentNodeObjectMapping/getByObjectType/' + currentId + '/' + companyId)
                // return this._http.get(this._url + '/DocumentNodeObjectMapping/getByObjectType/2/' + companyId)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    // let documentType: DocumentType[] = null;
                    let documentType = (<DocumentType[]>data).map((data: any) => {
                        return DocumentTypeAdapter.parseResponse(data);
                    });
                    resolve(documentType);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<DocumentType[]>>Observable.fromPromise(promise);
    }

    addDocument(documentType: DocumentType): Observable<DocumentType> {
        let promise: Promise<DocumentType> = new Promise((resolve, reject) => {
            let requestData: any = documentType.toJS();
            // requestData. documentType = requestData. documentType;
            // requestData.objectType = requestData.objectType;
            // requestData.companyid = requestData.companyid;
            // requestData = _.omit(requestData, 'documentType', 'objectType', 'companyid');
            return this._http.post(this._url + '/DocumentNodeObjectMapping/saveDocumentType/', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let documentType: DocumentType = null;
                    documentType = DocumentTypeAdapter.parseResponse(data);
                    resolve(documentType);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<DocumentType>>Observable.fromPromise(promise);
    }

    deleteDocument(documentType: DocumentType): Observable<DocumentType> {
        // let companyId = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            let requestData: any = documentType.toJS();
            requestData = {
                objectType: requestData.objectType,
                documentType: requestData.documentType,
                companyid: requestData.companyId,
            }
            // return this._http.get(this._url + '/AttorneyMaster/delete/' + attorney.id, {
            return this._http.post(this._url + '/DocumentNodeObjectMapping/deleteDocumentType', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data) => {
                    let documentType: DocumentType = null;
                    documentType = DocumentTypeAdapter.parseResponse(data);
                    resolve(documentType);
                }, (error) => {
                    reject(error);
                });
        });
        
        return <Observable<DocumentType>>Observable.from(promise);
    }


}


