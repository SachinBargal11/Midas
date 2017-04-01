import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientVisitsStore } from '../../patient-visit/stores/patient-visit-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { Message } from 'primeng/primeng'
import { environment } from '../../../../environments/environment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Observable } from 'rxjs/Rx';
import { FileUpload, FileUploadModule } from 'primeng/primeng';
import { CaseDocument } from '../models/case-document';
import { CasesStore } from '../../cases/stores/case-store';
import { CaseService } from '../../cases/services/cases-services';
import { ScannerService } from '../../../commons/services/scanner-service';


@Component({
    selector: 'case-documents',
    templateUrl: './case-documents.html'
})

@Injectable()
export class CaseDocumentsUploadComponent implements OnInit {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    msgs: Message[];
    uploadedFiles: any[] = [];
    currentCaseId: number;
    documents: CaseDocument[] = [];
    url;

    scannerContainerId: string = `scanner_${moment().valueOf()}`;
    twainSources: TwainSource[] = [];
    selectedTwainSource: TwainSource = null;
    _dwObject: any = null;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _casesStore: CasesStore,
        private _caseService: CaseService,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _scannerService: ScannerService
    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            this.currentCaseId = parseInt(routeParams.caseId, 10);
            this.url = this._url + '/fileupload/multiupload/' + this.currentCaseId + '/case';
            // this._progressBarService.show();
            // this._patientVisitStore.getDocumentsForVisitId(this.currentVisitId)
            //     .subscribe(document => {
            //         this.document = document

            //     },
            //     (error) => {
            //         this._progressBarService.hide();
            //     },
            //     () => {
            //         this._progressBarService.hide();
            //     });
        });

    }

    ngOnInit() {
        this.downloadDocument();
    }

    ngOnDestroy() {
        this._scannerService.deleteWebTwain(this.scannerContainerId);
        this._scannerService.unloadAll();
    }

    ngAfterViewInit() {
        _.defer(() => {
            this._scannerService.getWebTwain(this.scannerContainerId)
                .then((dwObject) => {
                    this._dwObject = dwObject;
                    if (this._dwObject) {
                        for (let i = 0; i < this._dwObject.SourceCount; i++) {
                            this.twainSources.push({ idx: i, name: this._dwObject.GetSourceNameItems(i) });
                        }

                    }
                }).catch(() => {
                    // (<any>window).OnWebTwainNotFoundOnWindowsCallback();
                    this._notificationsService.alert('', 'Not able to connect scanner. Please refresh the page again and download the software prompted.');
                });
        });

    }

    AcquireImage() {
        if (this._dwObject) {
            this._dwObject.IfDisableSourceAfterAcquire = true;
            if (this.selectedTwainSource) {
                this._dwObject.SelectSourceByIndex(this.selectedTwainSource.idx);
            } else {
                this._dwObject.SelectSource();
            }
            this._dwObject.OpenSource();
            this._dwObject.AcquireImage();
        }
    }

    uploadDocuments() {
        debugger;
        this._casesStore.uploadScannedDocuments(this._dwObject, this.currentCaseId)
            .subscribe(
            (documents: CaseDocument[]) => {
                this.documents = documents;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    onUpload(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
        // let file = this.uploadedFiles;
        // this._casesStore.uploadDocument(this.uploadedFiles,this.currentCaseId);

        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
        this.downloadDocument();
    }


    downloadDocument() {
        this._progressBarService.show();
        this._casesStore.getDocumentsForCaseId(this.currentCaseId)
            .subscribe(document => {
                this.documents = document;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }


}

export interface TwainSource {
    idx: number;
    name: string;
}



