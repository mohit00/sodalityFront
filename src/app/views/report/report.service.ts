import { Injectable, EventEmitter } from '@angular/core';

 import {
  Router
} from '@angular/router';
import { environment } from 'environments/environment';
  
@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {
    constructor(private router: Router
        // tslint:disable-next-line: no-shadowed-variable
      ) {
    
      }
      retportset( url) {
        window.open(environment.FACILITY_URL+url,"_blank")
        
      }
    
}