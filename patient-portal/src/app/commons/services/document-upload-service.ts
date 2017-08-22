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
import { SessionStore } from '../../commons/stores/session-store';
import { DocumentTypeAdapter } from '../services/adapters/document-type-adapter'
import { DocumentType } from '../models/document-type';
@Injectable()
export class DocumentUploadService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();
    
        constructor(
            private _http: Http,
            private _sessionStore: SessionStore
        ) {
            this._headers.append('Content-Type', 'application/json');
            this._headers.append('Authorization', this._sessionStore.session.accessToken);
        }

    uploadScanDocument(dwObject: any, url: string, fileName: string) {
        let promise: Promise<Document[]> = new Promise((resolve, reject) => {
            dwObject.IfSSL = false; // Set whether SSL is used
            dwObject.HTTPPort = 80;
            dwObject.HttpFieldNameOfUploadedImage = 'demo[]';
            dwObject.HTTPUploadAllThroughPostAsPDF(
                url,
                '',
                fileName ? `${fileName}.pdf` : `scanned_file_${moment().format('DD-MMM-YYYY hh-mm')}.pdf`,
                (response: any) => {
                    resolve(response);
                },
                (errorCode: string, errorString: string, response: any) => {
                    let responseData: any = JSON.parse(response);
                    let documents: Document[] = (<Object[]>responseData).map((document: any) => {
                        return DocumentAdapter.parseResponse(document);
                    });
                    resolve(documents);
                    // reject(new Error(errorString));
                });
        });
        return promise;
    }

    uploadSignedDocument(url: string, signatureData: any): Promise<Document> {
        let promise: Promise<Document> = new Promise((resolve, reject) => {
            return this._http.post(url, signatureData)
                .map(res => res.json())
                .subscribe((data: any) => {
                    let document: Document = DocumentAdapter.parseResponse(data);
                    resolve(document);
                }, (error) => {
                    reject(error);
                });
        });
        return promise;
    }

    getDocumentObjectType(companyId: Number, currentId: number): Observable<DocumentType[]> {
        let promise: Promise<DocumentType[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/DocumentNodeObjectMapping/getByObjectType/' + currentId + '/' + companyId)
                // return this._http.get(environment.SERVICE_BASE_URL + '/DocumentNodeObjectMapping/getByObjectType/2/' + companyId)
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

}
