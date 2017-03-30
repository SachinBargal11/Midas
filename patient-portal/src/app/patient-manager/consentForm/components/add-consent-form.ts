
// import { FileUploadModule } from 'primeng/primeng';
// import { Component, OnInit, ElementRef } from '@angular/core';

// import { Router,ActivatedRoute } from '@angular/router';
// import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
// import { AppValidators } from '../../../commons/utils/AppValidators';

// import { User } from '../../../commons/models/user';
// import { NotificationsStore } from '../../../commons/stores/notifications-store';
// import { Notification } from '../../../commons/models/notification';
// import * as moment from 'moment';
// import { ProgressBarService } from '../../../commons/services/progress-bar-service';
// import { NotificationsService } from 'angular2-notifications';
// import { UserType } from '../../../commons/models/enums/user-type';
// import { Contact } from '../../../commons/models/contact';
// import { Address } from '../../../commons/models/address';
// import { SessionStore } from '../../../commons/stores/session-store';
// import { AddConsentStore } from '../stores/add-consent-form-store';

// import { AddConsentFormService } from '../services/consent-form-service';
// import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
// @Component({
//     selector: 'add-consent-form',
//     templateUrl: './add-consent-form.html',
//     providers: [AddConsentFormService]
// })

// export class AddConsentFormComponent implements OnInit {

//     doctors: any[];
//     isdoctorsLoading = false;
//     isSaveProgress = false;
//     states: any[]
//     consentform: FormGroup;
//     consentformControls;

//     minDate: Date;
//     maxDate: Date;
//     patientId: number;
//     selectedCity = 0;
//     isPassChangeInProgress;

//     // public base_path_service: string = "http://128.199.190.109/api/";
//     constructor(

//         private service: AddConsentFormService,

//         public http: Http,
//         private _AddConsentStore: AddConsentStore,
//         private fb: FormBuilder,
//         private _router: Router,
//            public _route: ActivatedRoute,
//         private _notificationsStore: NotificationsStore,
//         private _sessionStore: SessionStore,
//         private _progressBarService: ProgressBarService,
//         private _notificationsService: NotificationsService,
//         private _elRef: ElementRef,
//        // private _statesStore: StatesStore,


//     ) 

//     {
//           this._route.parent.parent.parent.params.subscribe((routeParams: any) => {
//             this.c = parseInt(routeParams.patientId, 10);
//         this.consentform = this.fb.group({
//             attorneyState: ['', Validators.required]
//         });
//         this.consentformControls = this.consentform.controls;
//     }
//     )}

//     ngOnInit() {
//         let today = new Date();
//         let currentDate = today.getDate();
//         this.maxDate = new Date();
//         this.maxDate.setDate(currentDate);
//         this._AddConsentStore.getdoctors(this.patientId)
//             .subscribe(doctor => this.doctors = doctor);


//     }

//     selectDoctor(event) {
//         this.selectedDoctor = 0;
//         let currentState = event.target.value;
//         // this.loadCities(currentState);
//     }

//     myfile = {
//         "name": "Upload",
//         "image": ''
//     }

//     // fileChangeEvent(fileInput: any){
//     //    this.myfile.image = fileInput.target.files;        
//     // }

//     onChange(event) {
//         console.log('onChange');
//         var files = event.srcElement.files;
//         console.log(files);
//         this.service.makeFileRequest('http://midas.codearray.tk/patientapi/fileupload/upload/5/case/', [], files)
//             .subscribe(() => {
//                // console.log('sent');
//                 this._notificationsService.success('Success', 'File Uploaded successfully!');
//                 setTimeout(() => {
//                     this._router.navigate(['/account/login']);
//                 }, 3000);
//             },
//             error => {
//                 debugger;
//                // console.log(error),
//                     this.isPassChangeInProgress = false;
//                 let errString = 'Unable to upload.';
//                 this._notificationsService.error('Error!', ErrorMessageFormatter.getErrorMessages(error, errString));
//             },

//             () => {
//                // console.log('Authentication Complete');
//                 this.isPassChangeInProgress = false;
//             }
//             );

//     }

//     upload() {       
//         debugger;
//        this.isSaveProgress = true;
//         let consentFormValues = this.consentform.value;
//         let result;

//         // let consentForm = new Consent({
//         //     doctorID: consentFormValues.State,
//         //      });

//         this._progressBarService.show();
//         this.http.post('http://midas.codearray.tk/patientapi/fileupload/upload/5/case/', this.myfile)
//             .subscribe(
//             data => {
//                 console.log("data submitted");
//                 this._notificationsService.success('Success', 'File Uploaded successfully!');
//                 setTimeout(() => {
//                     this._router.navigate(['/account/login']);
//                 }, 3000);
//             },
//             error => {
//                 debugger;
//                 console.log(error),
//                     this.isPassChangeInProgress = false;
//                 let errString = 'Unable to upload.';
//                 this._notificationsService.error('Error!', ErrorMessageFormatter.getErrorMessages(error, errString));
//             },

//             () => {
//                 console.log('Authentication Complete');
//                 this.isPassChangeInProgress = false;
//             }
//             );
//     }

// }

import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { Message } from 'primeng/primeng'
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { FileUpload, FileUploadModule } from 'primeng/primeng';
import { AddConsentStore } from '../stores/add-consent-form-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { AddConsentFormService } from '../services/consent-form-service';

@Component({
    selector: 'add-consent-form',
    templateUrl: './add-consent-form.html',
    providers: [AddConsentFormService]
})

export class AddConsentFormComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    msgs: Message[];
    uploadedFiles: any[] = [];
    currentId: number;
    //document: VisitDocument;
    url;
    doctors: any[];
    isdoctorsLoading = false;
    isSaveProgress = false;
    states: any[]
    consentForm: FormGroup;
    consentformControls;

    minDate: Date;
    maxDate: Date;
    patientId: number;
    selectedDoctor = 0;
    isPassChangeInProgress;
companyId: number;
    constructor(
        private fb: FormBuilder,
        private service: AddConsentFormService,
        private _router: Router,
        public _route: ActivatedRoute,
        private _AddConsentStore: AddConsentStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
  private _sessionStore: SessionStore,

    ) {

        this._route.parent.parent.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId, 10);
            //let companyId: number = this._sessionStore.session.currentCompany.id;
            this.url = this._url + '/fileupload/upload/' + this.currentId + '/visit';
            this.companyId = 0;//this._sessionStore.session.currentCompany.id;
            this.consentForm = this.fb.group({
                doctor: ['', Validators.required]
            });
            this.consentformControls = this.consentForm.controls;
        })

    }

    ngOnInit() {
        let today = new Date();
        let currentDate = today.getDate();
        this.maxDate = new Date();
        this.maxDate.setDate(currentDate);
        this._AddConsentStore.getdoctors(this.companyId)
            .subscribe(doctor => this.doctors = doctor);


    }

    selectDoctor(event) {
        this.selectedDoctor = 0;
        let currentDoctor = event.target.value;

    }

    onUpload(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
    }

}