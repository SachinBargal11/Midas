import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStore } from './commons/stores/session-store';
import { NotificationsStore } from './commons/stores/notifications-store';
import { ProgressBarService } from './commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  dateNow;
  options = {
    timeOut: 5000,
    showProgressBar: false,
    pauseOnHover: false,
    clickToClose: false
  };

  constructor(
    private _router: Router,
    public sessionStore: SessionStore,
   public notificationsStore: NotificationsStore,
    private _notificationsService: NotificationsService,
    public progressBarService: ProgressBarService,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {

    this.sessionStore.authenticate().subscribe(
      (response) => {

      },
      error => {
        // this._router.navigate(['/account/login']);
      }
    );
    // this._specialityStore.getSpecialities();
    // this._statesStore.getStates();
  }
  // To remove Expression changed error
  ngAfterViewChecked() {
    // console.log( "! Expression has been changed !" );
    this.dateNow = new Date();
    this.cdRef.detectChanges();
  }
}
