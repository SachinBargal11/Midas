import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'underscore';
import { NotificationsService } from 'angular2-notifications';
import { ScannerService } from '../../../commons/services/scanner-service';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {

  scannerContainerId: string = `scanner_${moment().valueOf()}`;
  documentMode: string = '1';
  twainSources: TwainSource[] = [];
  selectedTwainSource: TwainSource = null;
  _dwObject: any = null;

  @Input() url: string;
  @Output() uploadDocumentEvent = new EventEmitter();
  @Output() uploadScannedDocumentEvent = new EventEmitter();


  constructor(
    private _scannerService: ScannerService,
    private _notificationsService: NotificationsService
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unloadWebTwain();
  }

  uploadDocuments(event) {
    this.uploadDocumentEvent.emit(event);
  }

  uploadScannedDocuments() {
    this.uploadScannedDocumentEvent.emit(this._dwObject);
  }

  unloadWebTwain() {
    this._scannerService.deleteWebTwain(this.scannerContainerId);
    this._scannerService.unloadAll();
  }

  ngAfterViewInit() {
    _.defer(() => {
      this._createDWObject();
    });
  }

  resetWebTwain() {
    this.unloadWebTwain();
    this._createDWObject();
  }

  private _createDWObject() {
    this._scannerService.getWebTwain(this.scannerContainerId)
      .then((dwObject) => {
        this._dwObject = dwObject;
        this._dwObject.SetViewMode(1, -1);
        if (this._dwObject) {
          for (let i = 0; i < this._dwObject.SourceCount; i++) {
            this.twainSources.push({ idx: i, name: this._dwObject.GetSourceNameItems(i) });
          }
        }
      }).catch(() => {
        this._notificationsService.alert('', 'Not able to connect scanner. Please refresh the page again and download the software prompted.');
      });
  }

  AcquireImage() {
    if (this._dwObject) {
      this._dwObject.IfDisableSourceAfterAcquire = true;
      if (this.selectedTwainSource) {
        this._dwObject.SelectSourceByIndex(this.selectedTwainSource.idx);
      } else {
        this._dwObject.SelectSource();
      }
      this._dwObject.OpenSource();
      this._dwObject.AcquireImage();
    }
  }

}
export interface TwainSource {
  idx: number;
  name: string;
}