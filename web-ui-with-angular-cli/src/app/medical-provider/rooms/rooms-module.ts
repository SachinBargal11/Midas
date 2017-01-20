import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonsModule } from '../../commons/commons-module';
import { AddRoomComponent } from './components/add-room';
import { EditRoomComponent } from './components/edit-room';
import { RoomsComponent } from './components/rooms';
import { RoomsService } from './services/rooms-service';
import { RoomsStore } from './stores/rooms-store';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonsModule
    ],
    declarations: [
        AddRoomComponent,
        EditRoomComponent,
        RoomsComponent
    ],
    providers: [
        RoomsService,
        RoomsStore
    ]
})
export class RoomsModule { }
