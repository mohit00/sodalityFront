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
GET_CURRENCY_AND_UNIT = 'webapi/measurement_unit';
  ibmsToken: any;
DATA_LOGGER = 'webapi/datalogger';

TOWER_DATA_LOGGER = 'webapi/tower_list';
TOWER_DIC_LIST = 'webapi/dic_list_tower_wise';
DIC_LIST = 'webapi/dic_list';
SENSOR_LIST = 'webapi/sensor_list'

SENSOR_DETAIL = 'webapi/sensor_details';
SENSOR_MONTHLY_BILL_DETAIL = 'webapi/sensor_monthly_bill';
SENSOR_MONTHLY_DETAIL ='webapi/sensor_monthly_details';
SENSOR_DAILY_DETAIL ='webapi/sensor_daily_details';
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
  sensorDetail( token,id): Observable<any>{
      
    return this._http.get(environment.FACILITY_URL + this.SENSOR_DETAIL + '?token_id='+token+'&sensor_id='+id).pipe(
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
  sensorMonthlyBill( token,id): Observable<any>{
      
    return this._http.get(environment.FACILITY_URL + this.SENSOR_MONTHLY_BILL_DETAIL + '?token_id='+token+'&sensor_id='+id).pipe(
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
  sensorMonthlyDetail(token, id): Observable<any>{
      
    return this._http.get(environment.FACILITY_URL + this.SENSOR_MONTHLY_DETAIL + '?token_id='+token+'&sensor_id='+id).pipe(
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
  sensorDailyDetail( token,id): Observable<any>{
      
    return this._http.get(environment.FACILITY_URL + this.SENSOR_DAILY_DETAIL + '?token_id='+token+'&sensor_id='+id).pipe(
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
  sensorList( id): Observable<any>{
      
    return this._http.get(environment.FACILITY_URL + this.SENSOR_LIST + '?token_id='+this.tokenId+'&dic_id='+id).pipe(
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
  getDataLogger( ): Observable<any>{
      
    return this._http.get(environment.FACILITY_URL + this.DATA_LOGGER + '?token_id='+this.tokenId).pipe(
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
  getDICList( ): Observable<any>{
      
    return this._http.get(environment.FACILITY_URL + this.DIC_LIST + '?token_id='+this.tokenId).pipe(
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
  getTowerDataLogger( id): Observable<any>{
      
    return this._http.get(environment.FACILITY_URL + this.TOWER_DATA_LOGGER + '?token_id='+this.tokenId+'&datalogger_id='+id).pipe(
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
  getTowerDics( dataloggerId,towerid): Observable<any>{
     return this._http.get(environment.FACILITY_URL + this.TOWER_DIC_LIST + '?token_id='+this.tokenId+'&datalogger_id='+dataloggerId+'&tower_id='+towerid).pipe(
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
  getCurrent( ): Observable<any>{
      
    return this._http.get(environment.FACILITY_URL + this.GET_CURRENCY_AND_UNIT + '?token_id='+this.tokenId).pipe(
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
      
    return this._http.get(environment.FACILITY_URL + this.WEEK_WISE_RECHARGE+ '?token_id='+this.tokenId
    ).pipe(
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
