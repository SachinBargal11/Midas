import {Component, OnInit, ElementRef} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {SessionStore} from '../../../commons/stores/session-store';
import {NotificationsStore} from '../../../commons/stores/notifications-store';

@Component({
    selector: 'employee',
    templateUrl: './employee.html'
})

export class EmployeeComponent implements OnInit {

    ngOnInit() {
    }


    save() {
    }

}
