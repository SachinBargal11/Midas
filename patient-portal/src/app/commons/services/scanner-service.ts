import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ScannerService {

    private _webTwain: any;

    constructor(
    ) {
        this._webTwain = (<any>window).Dynamsoft.WebTwainEnv;
    }

    getWebTwain(containerId: string): Promise<any> {
       
        return new Promise((resolve, reject) => {
            let timeout = setTimeout(function () {
                reject(new Error('Connection to Scanner Failed'));
            }, 5000);
            this._webTwain.CreateDWTObject(containerId, '127.0.0.1', 18618, 18619, (dwObject) => {
                clearTimeout(timeout);
                resolve(dwObject);
            }, (error) => {
                reject(error);
            });
        });
    }

    deleteWebTwain(containerId: string) {
        this._webTwain.DeleteDWTObject(containerId);
    }

    unloadAll() {
        this._webTwain.Unload();
    }
}
