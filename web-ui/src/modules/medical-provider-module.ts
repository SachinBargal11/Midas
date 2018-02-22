import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared-module';
import { LocationModule } from './location-module';
import { UsersModule } from './users-module';
import { RoomsModule } from './rooms-module';
import { MedicalProviderNavComponent } from '../components/pages/medical-provider/medical-provider-nav-bar';
import { MedicalProviderShellComponent } from '../components/pages/medical-provider/medical-provider-shell';
import { MedicalProviderService } from '../services/medical-provider-service';
import { MedicalProviderRoutingModule } from '../routes/medical-provider-routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    LocationModule,
    UsersModule,
    RoomsModule,
    MedicalProviderRoutingModule
  ],
  declarations: [
    MedicalProviderNavComponent,
    MedicalProviderShellComponent
  ],
  providers: [
    MedicalProviderService
  ]
})
export class MedicalProviderModule { }
