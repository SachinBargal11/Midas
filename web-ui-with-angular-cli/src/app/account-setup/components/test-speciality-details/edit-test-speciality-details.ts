import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { TestSpecialityDetail } from '../../models/test-speciality-details';
import {Tests} from '../../../medical-provider/rooms/models/tests';
import { TestSpecialityDetailsStore } from '../../stores/test-speciality-details-store';
import { AppValidators } from '../../../commons/utils/AppValidators';

import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { SessionStore } from '../../../commons/stores/session-store';

@Component({
  selector: 'edit-test-speciality-details',
  templateUrl: './edit-test-speciality-details.html'
})
export class EditTestSpecialityDetailsComponent {
    roomTestID: number;
    roomTest: Tests;
    associatedTestSpeciality: string;
    testSpecialityDetail: TestSpecialityDetail;
    isTestSpecialityDetailSaveInProgress = false;
    roomTestSpecialities: Tests[];
    title: string;
    testSpecialityDetailForm: FormGroup;
    testSpecialityDetailFormControls: any;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    testSpecialityDetailJS: any = null;

  constructor(
    public _route: ActivatedRoute,
    public _router: Router,
    private fb: FormBuilder,
    private _notificationsStore: NotificationsStore,
    private _notificationsService: NotificationsService,
    private _testSpecialityDetailsStore: TestSpecialityDetailsStore,
    private _progressBarService: ProgressBarService,
    public _sessionStore: SessionStore,
    private _testSpecialityStore: RoomsStore
  ) { 

    this._route.parent.params.subscribe((routeParams: any) => {
        this.roomTestID = parseInt(routeParams.id, 10);
        this._progressBarService.show();
        this._testSpecialityStore.fetchTestSpecialityById(this.roomTestID)
            .subscribe(
            (roomTest: Tests) => {
                this.roomTest = roomTest;
                this.associatedTestSpeciality = roomTest.name;
            },
            (error) => {
                this._router.navigate(['/account-setup/specialities']);
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
        let requestData = {
            company: {
                id: this._sessionStore.session.currentCompany.id
            },
            roomTest: {
                id: this.roomTestID
            }
        };
        let result = this._testSpecialityDetailsStore.getTestSpecialityDetails(requestData);
        result.subscribe(
            (testSpecialityDetail: TestSpecialityDetail) => {
                this.testSpecialityDetail = testSpecialityDetail;
                if (this.testSpecialityDetail.id) {
                    this.testSpecialityDetailJS = this.testSpecialityDetail.toJS();
                    this.title = 'Edit Test Specialty Detail';
                } else {
                    this.title = 'Add Test Specialty Detail';
                    this.testSpecialityDetailJS = new TestSpecialityDetail({});
                }
            },
            (error) => {
                this._router.navigate(['/account-setup/specialities']);
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    });
    this.testSpecialityDetailForm = this.fb.group({
        roomTest: [{ value: '', disabled: true }],
        showProcCode: ['']
    });

    this.testSpecialityDetailFormControls = this.testSpecialityDetailForm.controls;
  }

  ngOnInit() {
    this._testSpecialityStore.getTests()
    .subscribe(roomTestSpecialities => { this.roomTestSpecialities = roomTestSpecialities; });
  }

  saveTestSpecialityDetail() {
    let testSpecialityDetailFormValues = this.testSpecialityDetailForm.value;
    let testSpecialityDetail = new TestSpecialityDetail({
        associatedTestSpecialty: this.roomTestID,
        showProcCode: parseInt(testSpecialityDetailFormValues.showProcCode) ? true : false,
        roomTest: new Tests({
            id: this.roomTestID
        })

    });

    this._progressBarService.show();
    this.isTestSpecialityDetailSaveInProgress = true;
    let result: Observable<TestSpecialityDetail>;
    if (this.testSpecialityDetail.id) {
        result = this._testSpecialityDetailsStore.updateTestSpecialityDetail(testSpecialityDetail, this.testSpecialityDetail.id);
        result.subscribe(
            (response: TestSpecialityDetail) => {
                let notification = new Notification({
                    'title': 'Test specialty details updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/account-setup/specialities']);
            },
            (error) => {
                let errString = 'Unable to update test specialty details.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isTestSpecialityDetailSaveInProgress = false;
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isTestSpecialityDetailSaveInProgress = false;
                this._progressBarService.hide();
            });
    } else {
        result = this._testSpecialityDetailsStore.addTestSpecialityDetail(testSpecialityDetail);
        result.subscribe(
            (response: TestSpecialityDetail) => {
                let notification = new Notification({
                    'title': 'Test specialty details added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/account-setup/specialities']);
            },
            (error) => {
                let errString = 'Unable to add test specialty details.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isTestSpecialityDetailSaveInProgress = false;
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isTestSpecialityDetailSaveInProgress = false;
                this._progressBarService.hide();
            });

    }
}

}
