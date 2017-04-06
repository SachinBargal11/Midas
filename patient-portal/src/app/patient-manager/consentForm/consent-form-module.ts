import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import { AddDocConsentFormComponent } from './components/add-consent-form'
import { ConsentShellRoutingModule } from './consent-form-routes';
import { ConsentDocListComponent } from './components/list-consent-form'
//import {GrowlModule} from 'growl';
//import {TabViewModule} from '../../../components/tabview/tabview';
//import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		ConsentShellRoutingModule  
        //GrowlModule,
        //TabViewModule,
        //CodeHighlighterModule
	],
	declarations: [
		ConsentShellRoutingModule,ConsentDocListComponent
	]
})
export class AddConsentFormModule {}


