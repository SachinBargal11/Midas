import {Pipe, Injectable, PipeTransform} from '@angular/core';
import * as _ from 'underscore';

@Pipe({
    name: 'mapToJS',
    pure: false
})

@Injectable()
export class MapToJSPipe implements PipeTransform {
    transform(items: any[]): any {
        return _.map(items, (datum) => {
            return datum.toJS();
        });
    }
}