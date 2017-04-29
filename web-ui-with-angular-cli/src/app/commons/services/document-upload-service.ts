import { DocumentAdapter } from './adapters/document-adapter';
import { Document } from '../models/document';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { States } from '../models/states';
import { Cities } from '../models/cities';
import * as moment from 'moment';

@Injectable()
export class DocumentUploadService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;

    constructor(
        private _http: Http
    ) {

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

    uploadSignedDocument(url: string, signatureData: any): Promise<any> {
        let promise: Promise<any[]> = new Promise((resolve, reject) => {
            return this._http.post(url, signatureData)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {

                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return promise;
    }



}
