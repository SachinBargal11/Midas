import { DocumentAdapter } from '../../services/adapters/document-adapter';
import { Document } from '../../models/document';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'underscore';
import { NotificationsService } from 'angular2-notifications';
import { ScannerService } from '../../../commons/services/scanner-service';
import { DocumentUploadService } from '../../../commons/services/document-upload-service';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {

  scannerContainerId: string;
  documentMode: string = '1';
  twainSources: TwainSource[] = [];
  selectedTwainSource: TwainSource = null;
  dwObject: any = null;

  @Input() url: string;
  @Output() uploadComplete: EventEmitter<Document[]> = new EventEmitter();
  @Output() uploadError: EventEmitter<Error> = new EventEmitter();

  constructor(
    private _scannerService: ScannerService,
    private _notificationsService: NotificationsService,
    private _documentUploadService: DocumentUploadService
  ) {
    this._updateScannerContainerId();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unloadWebTwain();
  }

  private _updateScannerContainerId() {
    this.scannerContainerId = `scanner_${moment().valueOf()}`;
  }

  onFilesUploadComplete(event) {
    let responseDocuments: any = JSON.parse(event.xhr.responseText);
    let documents: Document[] = (<Object[]>responseDocuments).map((document: any) => {
      return DocumentAdapter.parseResponse(document);
    });
    this.uploadComplete.emit(documents);
  }

  onFilesUploadError(event) {
    this.uploadError.emit(new Error('Unable to upload selected files.'));
  }

  uploadScannedDocuments() {
    this._documentUploadService.uploadScanDocument(this.dwObject, this.url)
      .then((documents: Document[]) => {
        this.uploadComplete.emit(documents);
        this.resetWebTwain();
      })
      .catch((error) => {
        this.uploadError.emit(error);
      });
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
    this._updateScannerContainerId();
    this._createDWObject();
  }

  private _createDWObject() {
    this._scannerService.getWebTwain(this.scannerContainerId)
      .then((dwObject) => {
        this.dwObject = dwObject;
        this.dwObject.SetViewMode(1, -1);
        if (this.dwObject) {
          let twainSources: TwainSource[] = [];
          for (let i = 0; i < this.dwObject.SourceCount; i++) {
            twainSources.push({ idx: i, name: this.dwObject.GetSourceNameItems(i) });
          }
          this.twainSources = twainSources;
        }
      }).catch(() => {
        this._notificationsService.alert('', 'Not able to connect scanner. Please refresh the page again and download the software prompted.');
      });
  }

  acquireImage() {
    if (this.dwObject) {
      this.dwObject.IfDisableSourceAfterAcquire = true;
      if (this.selectedTwainSource) {
        this.dwObject.SelectSourceByIndex(this.selectedTwainSource.idx);
      } else {
        this.dwObject.SelectSource();
      }
      this.dwObject.OpenSource();
      this.dwObject.AcquireImage();
    }
  }

}
export interface TwainSource {
  idx: number;
  name: string;
}