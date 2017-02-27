import { Component } from '@angular/core';
import * as RRule from 'rrule';
// import {UsersStore} from '../../stores/users-store';
// import {DoctorsStore} from '../../stores/doctors-store';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.html',
})

export class DashboardComponent {
    users: any;
    doctors: any;
    providers: any;
    medicalfacilities: any;
    constructor(
    ) {
        // let str: string = 'INTERVAL=2;FREQ=DAILY;COUNT=4';
        // let rule: RRule = RRule.fromString(str);
        // console.log(rule.all());
        // // debugger;
        // let ruleSet: RRule.RRuleSet = new RRule.RRuleSet();
        // let rule1: RRule = new RRule({
        //     freq: RRule.WEEKLY,
        //     count: 30,
        //     interval: 2
        // });
        
        // ruleSet.rrule(rule1);
    }
}