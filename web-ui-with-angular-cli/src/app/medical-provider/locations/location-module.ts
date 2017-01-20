import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonsModule } from '../../commons/commons-module';
import { LocationComponent } from './components/location';
import { AccessComponent } from './components/access';
import { AddLocationComponent } from './components/add-location';
import { BasicComponent } from './components/basic';
import { LocationShellComponent } from './components/location-shell';
import { ScheduleComponent } from './components/schedule';
import { SettingsComponent } from './components/settings';
import { LocationsService } from './services/locations-service';
import { ScheduleService } from './services/schedule-service';
import { LocationsStore } from './stores/locations-store';
import { ScheduleStore } from './stores/schedule-store';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonsModule
    ],
    declarations: [
        LocationComponent,
        AddLocationComponent,
        AccessComponent,
        BasicComponent,
        LocationShellComponent,
        ScheduleComponent,
        SettingsComponent
    ],
    providers: [
        LocationsService,
        LocationsStore,
        ScheduleService,
        ScheduleStore
    ]
})
export class LocationModule { }