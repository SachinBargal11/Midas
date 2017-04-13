import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientVisitsStore } from '../../patient-visit/stores/patient-visit-store';
// import { PatientVisit } from '../../patient-visit/models/patient-visit';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { environment } from '../../../../environments/environment';
import { FileUpload, FileUploadModule } from 'primeng/primeng';
import { VisitDocument } from '../../patient-visit/models/visit-document';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Document } from '../../../commons/models/document';

@Component({
    selector: 'visit-documents',
    templateUrl: './visit-document.html'
})

export class VisitDocumentsUploadComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
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
            this.url = this._url + '/fileupload/multiupload/' + this.currentVisitId + '/visit';
        });
    }

    ngOnInit() {
        this.downloadDocument()
    }

    documentUploadComplete(documents: Document[]) {
        _.forEach(documents, (currentDocument: Document) => {
            if (currentDocument.status == 'Failed') {
                let notification = new Notification({
                    'title': currentDocument.message + '  ' + currentDocument.documentName,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
            }
        });
        // this.getDocuments();
    }

    documentUploadError(error: Error) {
        this._notificationsService.error('Oh No!', 'Not able to upload document(s).');
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