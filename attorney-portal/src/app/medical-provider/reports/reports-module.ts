import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonsModule } from '../../commons/commons-module';
import { ReportsComponent } from './components/reports';

@NgModule({
    imports: [CommonModule, RouterModule, CommonsModule],
    declarations: [
        ReportsComponent
    ],
    providers: []
})
export class ReportsModule { }
