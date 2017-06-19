import { Component, OnInit, Output, EventEmitter, ViewChildren, QueryList, ElementRef, Input, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'underscore';
import { DocumentAdapter } from '../../services/adapters/document-adapter';
import { Document } from '../../models/document';
import { NotificationsService } from 'angular2-notifications';
import { ScannerService } from '../../../commons/services/scanner-service';
import { DocumentUploadService } from '../../../commons/services/document-upload-service';
import { SignatureFieldComponent } from '../../../commons/components/signature-field/signature-field.component';
import { ConsentService } from '../../../patient-manager/cases/services/consent-service';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Notification } from '../../../commons/models/notification';
import { SessionStore } from '../../../commons/stores/session-store';
import { DocumentType } from '../../../account-setup/models/document-type';
import { environment } from '../../../../environments/environment';
import { UsersStore } from '../../../medical-provider/users/stores/users-store';
import { User } from '../../../commons/models/user';
import { Doctor } from '../../../medical-provider/users/models/doctor';
import { DoctorAdapter } from '../../../medical-provider/users/services/adapters/doctor-adapter';
import { Router, ActivatedRoute } from '@angular/router';
import { AssociateUserStore } from '../../../commons/stores/associate-user-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
@Component({
    selector: 'app-associate-user',
    templateUrl: './associate-users-component.html',
    styleUrls: ['./associate-users-component.scss']
})
export class AssociateUsersComponent implements OnInit {

    displayExistPopup: boolean = true;
    private _url = `${environment.SERVICE_BASE_URL}`;

    @Input() existUsers: User[];
    @Input() isPatientOrDoctor: string;

    constructor(
        private _fb: FormBuilder,
        private _sanitizer: DomSanitizer,
        private _scannerService: ScannerService,
        private _notificationsService: NotificationsService,
        private _documentUploadService: DocumentUploadService,
        private _progressBarService: ProgressBarService,
        private _consentService: ConsentService,
        private _sessionStore: SessionStore,
        private _router: Router,
        private _associateUserStore: AssociateUserStore,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
    ) {
        // this._updateScannerContainerId();
        // this.digitalForm = this._fb.group({
        //     signatureField: ['', Validators.required],
        //     iAgreeChkBox: [false, Validators.pattern('true')]
        // });
    }

    ngOnInit() {

        // alert(this.existUsers);
        // alert(this.isPatientOrDoctor);
    }

    associateUser(id) {
        let result;
        //  alert(this.isPatientOrDoctor);
        if (this.isPatientOrDoctor == 'patient') {
            result = this._associateUserStore.associatePatientWithCompany(id, this._sessionStore.session.account.user.id);
        }
        else if (this.isPatientOrDoctor == 'doctor') {
            result = this._associateUserStore.associateDoctorWithCompany(id, this._sessionStore.session.account.user.id);
        }
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'User Associated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                // this._router.navigate(['../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to Associate user.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                //  this.isSaveProgress = false;
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                // this.isSaveProgress = false;
                this._progressBarService.hide();
            });
    }

}