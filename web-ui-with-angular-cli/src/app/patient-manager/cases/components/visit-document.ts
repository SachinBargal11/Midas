import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientVisitsStore } from '../../patient-visit/stores/patient-visit-store';
// import { PatientVisit } from '../../patient-visit/models/patient-visit';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { Message } from 'primeng/primeng'
import { VisitDocument } from '../../patient-visit/models/visit-document';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { FileUpload, FileUploadModule } from 'primeng/primeng';

@Component({
    selector: 'visit-documents',
    templateUrl: './visit-document.html'
})

export class VisitDocumentsUploadComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    msgs: Message[];
    uploadedFiles: any[] = [];
    currentVisitId: number;
    document: VisitDocument[] = [];
    url;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _patientVisitStore: PatientVisitsStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,

    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            this.currentVisitId = parseInt(routeParams.visitId, 10);
            this.url = this._url + '/fileupload/multiupload/'+ this.currentVisitId +'/visit';
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
    this.downloadDocument()
    }

    onUpload(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
        let file = this.uploadedFiles[0];
        this._patientVisitStore.uploadDocument(file,this.currentVisitId);

        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
        this.downloadDocument()
    }


    downloadDocument() {
         this._progressBarService.show();
            this._patientVisitStore.getDocumentsForVisitId(this.currentVisitId)
                .subscribe(document => {
                    this.document = document

                },
                (error) => {
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        }

}