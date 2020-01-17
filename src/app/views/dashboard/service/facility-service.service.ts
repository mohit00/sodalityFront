 import { Injectable, EventEmitter } from '@angular/core';

import { HttpClient, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {
  Router
} from '@angular/router';
import {
  Observable
} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacilityServiceService {
  LOGIN = "webapi/login";
  FLAT_COUNT = "webapi/flat_details";
  RECHARGE = "webapi/recharge_details";
  DAILY_CONSUPTION = "webapi/daily_consumption";
  MONTHLY_CONSUMPTION = "webapi/monthly_consumption";

  WATER_CONSUMPTION = 'webapi/water_consumption'
  DG_GRID_CONSUMPTION = 'webapi/dg_grid_consumption';
  LOAD_CONSUMPTION ='webapi/load_consumption'
AMR_DATA = 'webapi/amr_data' 
  DG_FUEL_LEVEL =       'webapi/dg_fuel_level'
  WEEK_WISE_RECHARGE =       'webapi/week_wise_recharge'
  POWER_SATE =       'webapi/power_state'
TOWER_POWER_STATUS = 'webapi/power_status'
TOWER_LOW_BALANCE = 'webapi/low_balance'
  ibmsToken: any;

  constructor(private _http: HttpClient, private router: Router
    // tslint:disable-next-line: no-shadowed-variable
  ) {

  }
  tokenIddata:any;
   setTokenId(data){
    this.tokenIddata = data;
  }
  get tokenId(){
    return this.tokenIddata;
  }
  setIBMSTOKEN(data){
    this.ibmsToken=data;
  }
  get IBMSTOKEN(){
    return this.ibmsToken;
  }
  
  towerPowerStatus( ): Observable<any>{
      
    return this._http.get(environment.FACILITY_URL + this.TOWER_POWER_STATUS + '?token_id='+this.ibmsToken).pipe(
      // eg. "map" without a dot before
      map(data => {
        return data;
      }),
      // "catchError" instead "catch"
      catchError(error => {
        alert("Something went wrong ;)");
        return Observable.throw('Something went wrong ;)');
      })
    );
  }
  towerLowBalance( ): Observable<any>{
      
    return this._http.get(environment.FACILITY_URL + this.TOWER_LOW_BALANCE + '?token_id='+this.tokenId).pipe(
      // eg. "map" without a dot before
      map(data => {
        return data;
      }),
      // "catchError" instead "catch"
      catchError(error => {
        alert("Something went wrong ;)");
        return Observable.throw('Something went wrong ;)');
      })
    );
  }
  dgFuelLevel( ): Observable<any>{
      
    return this._http.get(environment.FACILITY_URL + this.DG_FUEL_LEVEL + '?token_id='+this.ibmsToken).pipe(
      // eg. "map" without a dot before
      map(data => {
        return data;
      }),
      // "catchError" instead "catch"
      catchError(error => {
        alert("Something went wrong ;)");
        return Observable.throw('Something went wrong ;)');
      })
    );
  }
  
  meterStatus( ): Observable<any>{
      
    return this._http.get(environment.FACILITY_URL + this.POWER_SATE + '?token_id='+this.tokenId).pipe(
      // eg. "map" without a dot before
      map(data => {
        return data;
      }),
      // "catchError" instead "catch"
      catchError(error => {
        alert("Something went wrong ;)");
        return Observable.throw('Something went wrong ;)');
      })
    );
  }
  townWeekWiselLevel( ): Observable<any>{
      
    return this._http.get('http://13.232.173.148/web_api/webapi/week_wise_recharge?token_id=979cdecf69837155fe734a8e1e377cae').pipe(
      // eg. "map" without a dot before
      map(data => {
        return data;
      }),
      // "catchError" instead "catch"
      catchError(error => {
        alert("Something went wrong ;)");
        return Observable.throw('Something went wrong ;)');
      })
    );
  }
  amrDashBoard( ): Observable<any>{
      
    return this._http.get(environment.FACILITY_URL + this.AMR_DATA + '?token_id='+this.tokenId).pipe(
      // eg. "map" without a dot before
      map(data => {
        return data;
      }),
      // "catchError" instead "catch"
      catchError(error => {
        alert("Something went wrong ;)");
        return Observable.throw('Something went wrong ;)');
      })
    );
  }
  login(loginId,password): Observable<any>{
      
    return this._http.get(environment.FACILITY_URL + this.LOGIN +'?login_id='+loginId+'&password='+password).pipe(
      // eg. "map" without a dot before
      map(data => {
        return data;
      }),
      // "catchError" instead "catch"
      catchError(error => {
        alert("Something went wrong ;)");
        return Observable.throw('Something went wrong ;)');
      })
    );
  }
  flatCount(): Observable<any>{
     
   return this._http.get(environment.FACILITY_URL + this.FLAT_COUNT+'?token_id='+this.tokenId).pipe(
     // eg. "map" without a dot before
     map(data => {
       return data;
     }),
     // "catchError" instead "catch"
     catchError(error => {
       alert("Something went wrong ;)");
       return Observable.throw('Something went wrong ;)');
     })
   );
 }
 Recharge(): Observable<any>{
     
  return this._http.get(environment.FACILITY_URL + this.RECHARGE+'?token_id='+this.tokenId).pipe(
    // eg. "map" without a dot before
    map(data => {
      return data;
    }),
    // "catchError" instead "catch"
    catchError(error => {
      alert("Something went wrong ;)");
      return Observable.throw('Something went wrong ;)');
    })
  );
}
dailyConsumption(): Observable<any>{
     
  return this._http.get(environment.FACILITY_URL + this.DAILY_CONSUPTION+'?token_id='+this.tokenId).pipe(
    // eg. "map" without a dot before
    map(data => {
      return data;
    }),
    // "catchError" instead "catch"
    catchError(error => {
      alert("Something went wrong ;)");
      return Observable.throw('Something went wrong ;)');
    })
  );
}
monthlyConsumption(): Observable<any>{
     
  return this._http.get(environment.FACILITY_URL + this.MONTHLY_CONSUMPTION+'?token_id='+this.tokenId).pipe(
    // eg. "map" without a dot before
    map(data => {
      return data;
    }),
    // "catchError" instead "catch"
    catchError(error => {
      alert("Something went wrong ;)");
      return Observable.throw('Something went wrong ;)');
    })
  );
}
waterConsumption(): Observable<any>{
   return this._http.get(environment.FACILITY_URL + this.WATER_CONSUMPTION+'?token_id='+this.IBMSTOKEN).pipe(
    // eg. "map" without a dot before
    map(data => {
      return data;
    }),
    // "catchError" instead "catch"
    catchError(error => {
      alert("Something went wrong ;)");
      return Observable.throw('Something went wrong ;)');
    })
  );
}
dgGridConsumption(): Observable<any>{
     
  return this._http.get(environment.FACILITY_URL + this.DG_GRID_CONSUMPTION+'?token_id='+this.tokenId).pipe(
    // eg. "map" without a dot before
    map(data => {
      return data;
    }),
    // "catchError" instead "catch"
    catchError(error => {
      alert("Something went wrong ;)");
      return Observable.throw('Something went wrong ;)');
    })
  );
}
loadConsumption(): Observable<any>{
     
  return this._http.get(environment.FACILITY_URL + this.LOAD_CONSUMPTION+'?token_id='+this.ibmsToken).pipe(
    // eg. "map" without a dot before
    map(data => {
      return data;
    }),
    // "catchError" instead "catch"
    catchError(error => {
      alert("Something went wrong ;)");
      return Observable.throw('Something went wrong ;)');
    })
  );
}
}
