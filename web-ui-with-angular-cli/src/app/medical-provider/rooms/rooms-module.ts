import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonsModule } from '../../commons/commons-module';
import { RoomsShellComponent } from './components/rooms-shell';
import { AddRoomComponent } from './components/add-room';
import { EditRoomComponent } from './components/edit-room';
import { RoomsComponent } from './components/rooms';
import { RoomsScheduleComponent } from './components/rooms-schedule';

import { RoomsService } from './services/rooms-service';
import { RoomsStore } from './stores/rooms-store';
import { ScheduleService } from './services/rooms-schedule-service';
import { ScheduleStore } from './stores/rooms-schedule-store';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonsModule
    ],
    declarations: [
        RoomsShellComponent,
        AddRoomComponent,
        EditRoomComponent,
        RoomsComponent,
        RoomsScheduleComponent
    ],
    providers: [
        RoomsService,
        RoomsStore,
        ScheduleService,
        ScheduleStore
    ]
})
export class RoomsModule { }
