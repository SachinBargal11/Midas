import {Component, OnInit, ElementRef} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {SessionStore} from '../../../commons/stores/session-store';
import {NotificationsStore} from '../../../commons/stores/notifications-store';

@Component({
    selector: 'case',
    templateUrl: './case.html'
})

export class CaseComponent implements OnInit {
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    caseform: FormGroup;
    caseformControls;
    isSaveProgress = false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef
    ) {
        this._route.params.subscribe((routeParams: any) => {
            console.log(routeParams.locationName);
        });
        this.caseform = this.fb.group({
                doi: [''],
                dot: [''],
                location: ['']
            
            });

        this.caseformControls = this.caseform.controls;
    }

    ngOnInit() {
    }


    save() {
    }

}
