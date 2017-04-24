import { Component, OnInit, Output, EventEmitter, ViewChildren, QueryList, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'underscore';
import { DocumentAdapter } from '../../services/adapters/document-adapter';
import { Document } from '../../models/document';
import { NotificationsService } from 'angular2-notifications';
import { ScannerService } from '../../../commons/services/scanner-service';
import { DocumentUploadService } from '../../../commons/services/document-upload-service';
import { SignatureFieldComponent } from '../../../commons/components/signature-field/signature-field.component';

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
  scannedFileName: string = '';
  private digitalForm: FormGroup;

  @Input() signedDocumentUploadUrl: string;
  @Input() isElectronicSignatureOn: boolean = false;
  @Output() signedDocumentUploadComplete: EventEmitter<Document[]> = new EventEmitter();
  @Output() signedDocumentUploadError: EventEmitter<Error> = new EventEmitter();

  @Input() url: string;
  @Output() uploadComplete: EventEmitter<Document[]> = new EventEmitter();
  @Output() uploadError: EventEmitter<Error> = new EventEmitter();



  @ViewChildren(SignatureFieldComponent) public sigs: QueryList<SignatureFieldComponent>;
  @ViewChildren('sigContainer1') public sigContainer1: QueryList<ElementRef>;

  constructor(
    private _fb: FormBuilder,
    private _scannerService: ScannerService,
    private _notificationsService: NotificationsService,
    private _documentUploadService: DocumentUploadService
  ) {
    this._updateScannerContainerId();
    this.digitalForm = this._fb.group({
      signatureField1: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unloadWebTwain();
  }

  ngAfterViewInit() {
    _.defer(() => {
      this._createDWObject();
    });
  }

  onDocumentModelChange(value) {
    if (value == '3') {
      _.defer(() => {
        this.beResponsive();
        this.setOptions();
      });
    }
  }

  beResponsive() {
    this.size(this.sigContainer1.first, this.sigs.first);
  }

  size(container: ElementRef, sig: SignatureFieldComponent) {
    sig.signaturePad.set('canvasWidth', 400);
    sig.signaturePad.set('canvasHeight', 300);
  }

  setOptions() {
    this.sigs.first.signaturePad.set('penColor', '#000000');
    this.sigs.first.signaturePad.set('backgroundColor', '#FFFFFF');
    this.sigs.first.signaturePad.clear(); // clearing is needed to set the background colour
  }

  saveDigitalForm() {
    console.log('CAPTURED SIGS:');
    console.log(this.sigs.first.signature);
    this._documentUploadService.uploadSignedDocument(this.signedDocumentUploadUrl, this.sigs.first.signature)
      .then((documents: Document[]) => {
        this.signedDocumentUploadComplete.emit(documents);
      })
      .catch((error) => {
        this.signedDocumentUploadError.emit(error);
      });

  }

  clear() {
    this.sigs.first.clear();
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
    let fileName = this.scannedFileName.trim();
    if (!fileName) {
      this._notificationsService.error('File Name not present', 'Please provide name of file for scanned document.');
      return;
    }
    this._documentUploadService.uploadScanDocument(this.dwObject, this.url, fileName)
      .then((documents: Document[]) => {
        this.uploadComplete.emit(documents);
        this.resetWebTwain();
        this.scannedFileName = '';
      })
      .catch((error) => {
        this.uploadError.emit(error);
      });
  }

  unloadWebTwain() {
    this._scannerService.deleteWebTwain(this.scannerContainerId);
    this._scannerService.unloadAll();
  }

  resetWebTwain() {
    this.unloadWebTwain();
    this._updateScannerContainerId();
    this._createDWObject();
  }

  private _createDWObject() {
    // this.scannedFileName = `scanned_file_${moment().format('DD-MMM-YYYY hh-mm')}`;
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