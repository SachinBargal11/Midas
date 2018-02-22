import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import {RoomsStore} from '../../../medical-provider/rooms/stores/rooms-store';
import { TestSpecialityDetail } from '../../models/test-speciality-details';
import {Tests} from '../../../medical-provider/rooms/models/tests';
import { TestSpecialityDetailsStore } from '../../stores/test-speciality-details-store';
import { AppValidators } from '../../../commons/utils/AppValidators';

import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';

@Component({
  selector: 'add-test-speciality-details',
  templateUrl: './add-test-speciality-details.html'
})
export class AddTestSpecialityDetailsComponent {

  isTestSpecialityDetailSaveInProgress = false;
  roomTest: Tests[];
  testSpecialityDetailForm: FormGroup;
  testSpecialityDetailFormControls: any;
  testSpecialityDetail = new TestSpecialityDetail({});
  testSpecialityDetailJS;
  associatedTestSpeciality;
  roomTestSpeciality: Tests;

  options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: false
  };

  constructor(
    public _route: ActivatedRoute,
    public _router: Router,
    private fb: FormBuilder,
    private _notificationsStore: NotificationsStore,
    private _notificationsService: NotificationsService,
    private _testSpecialityDetailsStore: TestSpecialityDetailsStore,
    private _progressBarService: ProgressBarService,
    private _testSpecialityStore: RoomsStore
  ) { 

    this._route.parent.params.subscribe((routeParams: any) => {
      let roomTestID: number = parseInt(routeParams.id);
      this._progressBarService.show();
      let result = this._testSpecialityStore.fetchTestSpecialityById(roomTestID);
      result.subscribe(
          (roomTest: Tests) => {
              this.roomTestSpeciality = roomTest;
              this.associatedTestSpeciality = roomTest.name;
          },
          (error) => {
              this._router.navigate(['/account-setup/specialities']);
              this._progressBarService.hide();
          },
          () => {
              this._progressBarService.hide();
          });
  });
  this.testSpecialityDetailJS = this.testSpecialityDetail.toJS();
  this.testSpecialityDetailForm = this.fb.group({
      associatedTestSpeciality: [{ value: '', disabled: true }],
      showProcCode: ['']
  });

  this.testSpecialityDetailFormControls = this.testSpecialityDetailForm.controls;
  }

  ngOnInit() {
    this._testSpecialityStore.getTests()
    .subscribe(roomTest => { this.roomTest = roomTest; });
  }

  saveTestSpecialityDetail() {
    let testSpecialityDetailFormValues = this.testSpecialityDetailForm.value;
    let testSpecialityDetail = new TestSpecialityDetail({
        showProcCode: parseInt(testSpecialityDetailFormValues.showProcCode) ? true : false,
        roomTest: new Tests({
            id: this.roomTestSpeciality.id
        })
    });
    this._progressBarService.show();
    this.isTestSpecialityDetailSaveInProgress = true;
    let result: Observable<TestSpecialityDetail>;

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
