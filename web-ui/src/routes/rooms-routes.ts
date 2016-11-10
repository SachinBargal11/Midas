import { Routes } from '@angular/router';
import { ValidateActiveSession } from './guards/validate-active-session';
import { RoomsComponent } from '../components/pages/rooms/rooms';
import { AddRoomComponent } from '../components/pages/rooms/add-room';

export const RoomsRoutes: Routes = [
    {
        path: 'rooms',
        component: RoomsComponent,
        canActivate: [ValidateActiveSession],
        children: [
            {
                path: 'add',
                component: AddRoomComponent,
                canActivate: [ValidateActiveSession]
            }
        ]
    }
];