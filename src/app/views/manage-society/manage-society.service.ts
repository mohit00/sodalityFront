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
export class TablesService {
  userDetail: any;
  BASE_URL = environment.LOCAL_BASE;
  GET_SOCIETY_LIST = 'user/get/admin/society';
  SOCIETY_SAVE = 'user/Save/society';
  SOCIETY_UPDATE = 'user/Society/Update';

  GET_SOCIETY_DATA_BY_ID = 'user/get/society/'
  //Tower
  GET_TOWER_LIST = 'Tower/get/List'
  GET_TOWER_BY_UUID = 'Tower/get'
  SAVE_TOWER = 'Tower/Add'
  UPDATE_TOWER = 'Tower/Update'
//Flat
UNIT_ADD='Unit/Add';
UNIT_GET_BY_TOWER ='Unit/Get'
UNIT_UPDATE ='Unit/Update';
UNIT_DETAIL_BY_UUID ='Unit/Get';

  constructor(private _http: HttpClient, private router: Router
    // tslint:disable-next-line: no-shadowed-variable
  ) {

  }
  getSocietyList(): Observable<any> {
    this.userDetail = JSON.parse(sessionStorage.getItem('data'));

    let dataJson = {
      id: this.userDetail.data.id
    }

    return this._http.post(this.BASE_URL + this.GET_SOCIETY_LIST, dataJson).pipe(
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

  societyget(data): Observable<any> {

    return this._http.get(this.BASE_URL + this.GET_SOCIETY_DATA_BY_ID + data).pipe(
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
  societySave(data): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/x-www-form-urlencoded' 
    //    })
    // };
    return this._http.post(this.BASE_URL + this.SOCIETY_SAVE, data).pipe(
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
  societyUpdate(data): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/x-www-form-urlencoded' 
    //    })
    // };
    return this._http.put(this.BASE_URL + this.SOCIETY_UPDATE, data).pipe(
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
  getTowerList(): Observable<any> {

    let dataJson = {
      uuid: sessionStorage.getItem('uuId')
    }

    return this._http.post(this.BASE_URL + this.GET_TOWER_LIST, dataJson).pipe(
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
  getTower(): Observable<any> {

     
    return this._http.get(this.BASE_URL + this.GET_TOWER_BY_UUID+'/'+sessionStorage.getItem('toweruuId')).pipe(
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
 saveTower(data): Observable<any> {
  this.userDetail = JSON.parse(sessionStorage.getItem('data'));

  data.parent_id = this.userDetail.data.id


    return this._http.post(this.BASE_URL + this.SAVE_TOWER,data).pipe(
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
  updateTower(data): Observable<any> {

    this.userDetail = JSON.parse(sessionStorage.getItem('data'));

    data.parent_id = this.userDetail.data.id
   
    return this._http.put(this.BASE_URL + this.UPDATE_TOWER,data).pipe(
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
  getFlatList(data): Observable<any> {

 
    return this._http.post(this.BASE_URL + this.UNIT_GET_BY_TOWER, data).pipe(
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
   FlatAdd(data): Observable<any> {
 

    return this._http.post(this.BASE_URL + this.UNIT_ADD, data).pipe(
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
  FlatUpdate(data): Observable<any> {

    

    return this._http.put(this.BASE_URL + this.UNIT_UPDATE, data).pipe(
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
  getFlat(): Observable<any> {

    

    return this._http.get(this.BASE_URL + this.UNIT_DETAIL_BY_UUID+'/'+sessionStorage.getItem('unituuId')).pipe(
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
 

  handleError = (e) => {
  }
  getDataConf() {
    return [
      {
        prop: 'id'
      },
      {
        prop: 'societyName',
        name: 'Name'
      },
      {
        prop: 'societyDisplayName',
        name: 'Display Name'
      },
      {
        prop: 'email',
        name: 'Email'
      }, {
        prop: 'contactNumber',
        name: 'Contact Number'
      },
      {
        prop: 'createdDate',
        name: 'Created Date'
      }, {
        prop: 'lastModifiedDate',
        name: 'last Modified Date'
      }

    ];
  }
  getAll() {
    return [
    ]
  }

}
