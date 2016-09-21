import {Component} from '@angular/core';
import {Router} from '@angular/router';

import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import 'chart.js';
import {DoctorsService} from '../../../services/doctors-service';
import {SessionStore} from '../../../stores/session-store';
import {DoctorsStore} from '../../../stores/doctors-store';
import {DoctorDetail} from '../../../models/doctor-details';
import {NotificationsService} from 'angular2-notifications';


@Component({
    selector: 'doctors-statistics',
    templateUrl: 'templates/pages/doctors/doctors-statistics.html'
})

export class DoctorsStatisticsComponent {
data: any;
options: any;
doctors: DoctorDetail[];
doctorsLoading;
constructor(
    private _router: Router,
    private _doctorsStore: DoctorsStore,
    private _doctorsService: DoctorsService,
    private _sessionStore: SessionStore,
    private _notificationsService: NotificationsService
) {
    this.doctorsLoading = true;
    this._doctorsStore.getDoctors().subscribe(doctors => {
        this.doctors = doctors;
        let groupedDoctors: Array<any> = _.chain(this.doctors).groupBy(function (doctor) {
            return doctor.toJS().doctor.createDate.format('Do MMM YY');
        }).map(function (value: Array<any>, key: string) {
            return {
                x: moment(key, 'Do MMM YY'),
                y: value.length
            };
        })
        .value();
        this.data.datasets[0].data = groupedDoctors;
    },
        null,
        () => {
            this.doctorsLoading = false;
        }
    );
    this.options = {
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'week'
                }
            }]
        }
    };
    this.data = {
        datasets: [
            {
                label: 'Doctors',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: []
            }
        ]
    };
}
  newDate(days) {
    return moment().add(days, 'd');
  }
}