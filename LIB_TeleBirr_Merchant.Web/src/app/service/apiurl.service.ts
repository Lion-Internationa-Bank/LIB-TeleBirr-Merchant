import { Injectable } from '@angular/core';
import {environment} from 'environments/environment'

@Injectable({
  providedIn: 'root', // Make the service available throughout the app
})
export class ApiUrlService {
 
 
   readonly apiUrl = 'https://10.1.22.206:7008/api/';
 //readonly apiUrl = 'http://10.1.22.206:7070/api/';
 //readonly apiUrl = 'https://10.1.10.106:7070/api/';

//readonly apiUrl = 'https://fana-sacco.anbesabank.et/api/';
readonly apiUrlMpesa = 'http://10.1.22.198:3000';
//readonly apiUrlUser = 'http://10.1.10.106:4040/api';
readonly apiUrlUser = 'https://10.1.10.106:4444/api';
readonly apiAwachUrl = environment.awachUrl;
readonly apiTeleBirrUrl = environment.TeleBirrUrl;
// readonly apiTeleBirrnamceCheckUrl = environment.TeleBirrNameCheck;
}