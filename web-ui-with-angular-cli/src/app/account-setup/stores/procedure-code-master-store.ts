import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Procedure } from '../../commons/models/procedure';
import { ProcedureCodeMasterService } from '../services/procedure-code-master-service';



@Injectable()
export class ProcedureCodeMasterStore {

}