import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  medicalProviderURI = environment.MEDICAL_PROVIDER_URI;
  patientPortalURI = environment.PATIENT_PORTAL_URI;
  attorneyPortalURI = environment.ATTORNEY_PORTAL_URI;
  ancillaryPortalURI = environment.ANCILLARY_PORTAL_URI;
  url = environment.AUTHORIZATION_SERVER_URL;

  registerMPUrl = environment.REGISTER_MP_URL;
  title = '';
  // client_id = 'js.manual';
  client_id = environment.CLIENT_ID;
  constructor() { }

  ngOnInit() {
  }
  rand() {
    return (Date.now() + "" + Math.random()).replace(".", "");
  }
  getToken(redirect_uri) {
    var authorizationUrl = this.url + '/connect/authorize';
    // var redirect_uri = window.location.protocol + "//" + window.location.host + "/JavaScriptClient/index.html";
    // var redirect_uri = redirect_uri;
    var response_type = "id_token token";
    var scope = environment.IDENTITY_SCOPE;

    var state = this.rand();
    var nonce = this.rand();
    localStorage["state"] = state;
    localStorage["nonce"] = nonce;

    var url =
      authorizationUrl + "?" +
      "client_id=" + encodeURI(this.client_id) + "&" +
      "redirect_uri=" + encodeURI(redirect_uri) + "&" +
      "response_type=" + encodeURI(response_type) + "&" +
      "scope=" + encodeURI(scope) + "&" +
      "state=" + encodeURI(state) + "&" +
      "nonce=" + encodeURI(nonce);
      url;
    window.location.assign(url);
  }
}
