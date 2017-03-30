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
            this._webTwain.CreateDWTObject(containerId, '127.0.0.1', 18618, 18619, (dwObject) => {
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
