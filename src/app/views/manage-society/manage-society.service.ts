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
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  userDetail: any;
  FAMILY_Owner_UUID = "familyOwnerUUid";
  FAMILY_MEMBER_UUID = "familyMemberUUid";

  BASE_URL = environment.LOCAL_BASE;
  GET_SOCIETY_LIST = 'user/get/admin/society';
  SOCIETY_SAVE = 'user/Save/society';
  SOCIETY_UPDATE = 'user/Society/Update';

  GET_SOCIETY_DATA_BY_ID = 'user/get/society/'

  //Staff
  GET_STAFF_LIST = 'user/get/society/staff'
  GET_STAFF_BY_UUID = 'user/get/staff/'
  SAVE_STAFF = 'user/staff/save'
  UPDATE_STAFF = 'user/staff/update'
GET_STAFF_BY_CATEGORY = 'user/get/society/staff/byCategory'
  //Tower
  GET_TOWER_LIST = 'Tower/get/List'
  GET_TOWER_BY_UUID = 'Tower/get'
  SAVE_TOWER = 'Tower/Add'
  UPDATE_TOWER = 'Tower/Update'
  //Flat
  UNIT_ADD = 'Unit/Add';
  UNIT_GET_BY_TOWER = 'Unit/Get'
  UNIT_UPDATE = 'Unit/Update';
  UNIT_DETAIL_BY_UUID = 'Unit/Get';
  //Category
  GET_CATEGORY_LIST = 'Category/Get'
  GET_CATEGORY_LIST_BY_RESIDENT = 'Category/Get/ByResident'

  GET_CATEGORY_BY_UUID = 'Category/Get/'
  SAVE_CATEGORY = 'Category/Add'
  UPDATE_CATEGORY = 'Category/Update'
  //Resident
  GET_RESIDENT_LIST = 'user/get/society/resident';
  GET_RESIDENT_BY_UUID = 'user/get/resident/'
  SAVE_RESIDENT = 'user/resident/save'
  UPDATE_RESIDENT = 'user/resident/update'
  GET_RESIDENT_FLAT = 'Unit/Resident/Get/';
  // Unit Type
  GET_UNIT_TYPE = 'Unittype/Get';
  GET_UNIT_TYPE_BY_UUID = 'Unittype/Get/'
  SAVE_UNIT_TYPE = 'Unittype/Add'
  UPDATE_UNIT_TYPET = 'Unittype/Update'

  // Family Member 
  FAMILY_SAVE = 'user/family/save';
  FAMILY_GET_BY_UUID = 'user/family/get/';
  FAMILY_GET_LIST = 'user/family/get';
  FAMILY_UPDATE = 'user/family/update';
// Parent GET UUid 
GET_PARENT_UUID ='user/get/parent/uuid/';
//COMPLAIN SERVICE GET 
RESIDENT_GET_COMPLAIN = 'Complain/get/Resident/Complain/List';
CREATE_COMPLAIN = 'Complain/Add';
UPDATE_COMPLAIN = 'Complain/Update';

GET_COMPLAIN_DETAIL = 'Complain/get/';
SOCIETY_COMPLAIN_GET ='Complain/get/Society/Complain/List';
GET_SOCIETY_COMPLAIN_LIST = 'Complain/get/Society/Complain/List';
COMPLAIN_ASSIGN_TO = 'Complain/Assign/to'
COMPLAIN_STAFF_LIST  = 'Complain/get/Staff/Complain/List'

//Comment
COMMENT_ADD ='ComplainComment/Add'
COMMENT_GET ="ComplainComment/Get"
//Group 
GROUP_GET="user/get/Group";
GROUP_ADD="user/Save/Group";
GROUP_UPDATE="user/Group/Update";
GROUP_GET_DETAIL ="user/get/Group/";
// Notice
NOTICE_GET= "Notice/getall/Notice";
NOTICE_ADD="Notice/Add/Notice";
NOTICE_UPDATE ="Notice/Update/Notice";
NOTICE_GET_DETAIL ="Notice/get/Notice/";
GET_ALL_NOTIFICATION = "Notice/getall/Notificaiton";
// websocket urk
webSocketEndPoint: string = environment.LOCAL_BASE+'/ws';
topic: string = "/topic/room/";
stompClient: any;

//Discussion 
DISCUSSION_GET= "Notice/getall/discussion";
DISCUSSION_ADD="Notice/Add/discussion";
DISCUSSION_UPDATE ="Notice/Update/discussion";
DISCUSSION_GET_DETAIL ="Notice/get/discussion/";
//notification Comment
NOTIFICATION_ADD ='Notication/Add/comment'
NOTIFICATION_UPDATE='Notication/Update/comment'
NOTIFICATION_GET_ALL='Notication/getall/comment'

   constructor(private _http: HttpClient, private router: Router
    // tslint:disable-next-line: no-shadowed-variable
  ) {

  }
  loaderCheck = new EventEmitter<any>();

  _connect(id) {
      console.log("Initialize WebSocket Connection");
      let ws = new SockJS(this.webSocketEndPoint);
      this.stompClient = Stomp.over(ws);
      const _this = this;
     let url = _this.topic + id;
      _this.stompClient.connect({}, function (frame) {
          _this.stompClient.subscribe(url, function (sdkEvent) {
              _this.onMessageReceived(sdkEvent);
          });
          //_this.stompClient.reconnect_delay = 2000;
      }, this.errorCallBack);
  };

  _disconnect() {
      if (this.stompClient !== null) {
          this.stompClient.disconnect();
      }
      console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
      console.log("errorCallBack -> " + error)
      setTimeout(() => {
          // this._connect();
      }, 5000);
  }

/**
 * Send message to sever via web socket
 * @param {*} message 
 */
  _send(message) {
      console.log("calling logout api via web socket");
      this.stompClient.send("/app/hello/416dd022-f816-4b89-b844-7a8b1ad7ace2/Owner" , {}, (JSON.stringify(message)));
  }

  onMessageReceived(message) {
      console.log(JSON.stringify( message));
      this.loaderCheck.emit(message);

      // this.appComponent.handleMessage(JSON.stringify(message.body));
  }
  getAllNotification(data,type): Observable<any>{
    let dataJson = {
      parentUUid:data,
      user_type:type
    }
    return this._http.post(this.BASE_URL + this.GET_ALL_NOTIFICATION , dataJson).pipe(
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
  notificationGet(data): Observable<any>{
    
    return this._http.post(this.BASE_URL + this.NOTIFICATION_GET_ALL , data).pipe(
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
  notificationAdd(data): Observable<any>{
    
    return this._http.post(this.BASE_URL + this.NOTIFICATION_ADD , data).pipe(
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
  notificationUpdate(data): Observable<any>{
   
    return this._http.put(this.BASE_URL + this.NOTIFICATION_UPDATE , data).pipe(
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
  discussionGet(data,type): Observable<any>{
    let dataJson = {
      parentUUid:data,
      type
    }
    return this._http.post(this.BASE_URL + this.DISCUSSION_GET , dataJson).pipe(
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
  discussionAdd(data): Observable<any>{
    
    return this._http.post(this.BASE_URL + this.DISCUSSION_ADD , data).pipe(
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
  discussionUpdate(data): Observable<any>{
   
    return this._http.put(this.BASE_URL + this.DISCUSSION_UPDATE , data).pipe(
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
  discussionGetDetail(data): Observable<any>{
  
    return this._http.get(this.BASE_URL + this.DISCUSSION_GET_DETAIL + data).pipe(
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
 noticeGet(data,type): Observable<any>{
    let dataJson = {
      parentUUid:data,
      type
    }
    return this._http.post(this.BASE_URL + this.NOTICE_GET , dataJson).pipe(
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
  noticeAdd(data): Observable<any>{
    
    return this._http.post(this.BASE_URL + this.NOTICE_ADD , data).pipe(
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
  noticeUpdate(data): Observable<any>{
   
    return this._http.put(this.BASE_URL + this.NOTICE_UPDATE , data).pipe(
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
  noticeGetDetail(data): Observable<any>{
  
    return this._http.get(this.BASE_URL + this.NOTICE_GET_DETAIL + data).pipe(
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
  groupGet(data): Observable<any>{
    let dataJson = {
      parentId:data
    }
    return this._http.post(this.BASE_URL + this.GROUP_GET , dataJson).pipe(
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
  groupSave(data): Observable<any>{
     
    return this._http.post(this.BASE_URL + this.GROUP_ADD , data).pipe(
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
  groupUpdate(data): Observable<any>{
    
    return this._http.put(this.BASE_URL + this.GROUP_UPDATE , data).pipe(
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
  groupGetDetail(data): Observable<any>{
    
    return this._http.get(this.BASE_URL + this.GROUP_GET_DETAIL+data).pipe(
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
  commentGet(data): Observable<any>{
    return this._http.post(this.BASE_URL + this.COMMENT_GET , data).pipe(
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
  commentAdd(data): Observable<any>{
    return this._http.post(this.BASE_URL + this.COMMENT_ADD , data).pipe(
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
  complainAssignTo(data): Observable<any> {

    return this._http.post(this.BASE_URL + this.COMPLAIN_ASSIGN_TO , data).pipe(
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
  complainStaffList(data): Observable<any> {

    return this._http.post(this.BASE_URL + this.COMPLAIN_STAFF_LIST , data).pipe(
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
  getResidentUnitUuid(data): Observable<any> {

    return this._http.get(this.BASE_URL + this.GET_RESIDENT_FLAT + data).pipe(
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
  getComplainDetail(data):Observable<any>{
    
    return this._http.get(this.BASE_URL + this.GET_COMPLAIN_DETAIL + data).pipe(
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
  updateComplain(data): Observable<any> {

    return this._http.post(this.BASE_URL + this.UPDATE_COMPLAIN , data).pipe(
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
  getParentUuid(data): Observable<any> {

    return this._http.get(this.BASE_URL + this.GET_PARENT_UUID + data).pipe(
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


    return this._http.get(this.BASE_URL + this.GET_TOWER_BY_UUID + '/' + sessionStorage.getItem('detailUuid')).pipe(
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


    return this._http.post(this.BASE_URL + this.SAVE_TOWER, data).pipe(
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

    return this._http.put(this.BASE_URL + this.UPDATE_TOWER, data).pipe(
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



    return this._http.get(this.BASE_URL + this.UNIT_DETAIL_BY_UUID + '/' + sessionStorage.getItem('detailUuid')).pipe(
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
  getCategoryList(data): Observable<any> {

    let dataJson = {
      parentId: data
    }
     return this._http.post(this.BASE_URL + this.GET_CATEGORY_LIST, dataJson).pipe(
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
  getCategoryResidentList(data): Observable<any> {

    let dataJson = {
      parentId: data
    }
     return this._http.post(this.BASE_URL + this.GET_CATEGORY_LIST_BY_RESIDENT, dataJson).pipe(
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
  
  getCategory(id): Observable<any> {


    return this._http.get(this.BASE_URL + this.GET_CATEGORY_BY_UUID + id).pipe(
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
  saveCategory(data): Observable<any> {
    this.userDetail = JSON.parse(sessionStorage.getItem('data'));
    data.parentId = this.userDetail.data.id


    return this._http.post(this.BASE_URL + this.SAVE_CATEGORY, data).pipe(
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
  updateCategory(data): Observable<any> {

    this.userDetail = JSON.parse(sessionStorage.getItem('data'));

    data.parent_id = this.userDetail.data.id

    return this._http.put(this.BASE_URL + this.UPDATE_CATEGORY, data).pipe(
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

  getStaffList(): Observable<any> {
    let dataJson = {
      uuid: sessionStorage.getItem('uuId')
    }

    return this._http.post(this.BASE_URL + this.GET_STAFF_LIST, dataJson).pipe(
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
getStaffListByCategory(data):Observable<any>{
  
  let dataJson = {
    uuid: sessionStorage.getItem('uuId'),
    categoryUUid:data
  }

  return this._http.post(this.BASE_URL + this.GET_STAFF_BY_CATEGORY, dataJson).pipe(
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
  staffget(data): Observable<any> {

    return this._http.get(this.BASE_URL + this.GET_STAFF_BY_UUID + data).pipe(
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
  staffSave(data): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/x-www-form-urlencoded' 
    //    })
    // };
    return this._http.post(this.BASE_URL + this.SAVE_STAFF, data).pipe(
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
  staffUpdate(data): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/x-www-form-urlencoded' 
    //    })
    // };
    return this._http.put(this.BASE_URL + this.UPDATE_STAFF, data).pipe(
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
  // Resident function

  getResidentList(): Observable<any> {
    let dataJson = {
      uuid: sessionStorage.getItem('uuId')
    }

    return this._http.post(this.BASE_URL + this.GET_RESIDENT_LIST, dataJson).pipe(
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

  residentget(data): Observable<any> {

    return this._http.get(this.BASE_URL + this.GET_RESIDENT_BY_UUID + data).pipe(
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
  residentSave(data): Observable<any> {

    return this._http.post(this.BASE_URL + this.SAVE_RESIDENT, data).pipe(
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
  residentUpdate(data): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/x-www-form-urlencoded' 
    //    })
    // };
    return this._http.put(this.BASE_URL + this.UPDATE_RESIDENT, data).pipe(
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
  // Unit Type Service 

  getUnitTypeList(): Observable<any> {
    let dataJson = {
      parentId: sessionStorage.getItem('uuId')
    }

    return this._http.post(this.BASE_URL + this.GET_UNIT_TYPE, dataJson).pipe(
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

  unitTypeget(data): Observable<any> {

    return this._http.get(this.BASE_URL + this.GET_UNIT_TYPE_BY_UUID + data).pipe(
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
  unitTypeSave(data): Observable<any> {

    return this._http.post(this.BASE_URL + this.SAVE_UNIT_TYPE, data).pipe(
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
  unitTypeUpdate(data): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/x-www-form-urlencoded' 
    //    })
    // };
    return this._http.put(this.BASE_URL + this.UPDATE_UNIT_TYPET, data).pipe(
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

  // Family Member Services

  getFamilyList(data): Observable<any> {
    let dataJson = {
      residentId: data
    }

    return this._http.post(this.BASE_URL + this.FAMILY_GET_LIST, dataJson).pipe(
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

  familyGetDetail(data): Observable<any> {

    return this._http.get(this.BASE_URL + this.FAMILY_GET_BY_UUID + data).pipe(
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
  familySave(data): Observable<any> {

    return this._http.post(this.BASE_URL + this.FAMILY_SAVE, data).pipe(
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
  familyUpdate(data): Observable<any> {
    return this._http.put(this.BASE_URL + this.FAMILY_UPDATE, data).pipe(
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
  //Complain service
   
 complainSave(data): Observable<any> {
  return this._http.post(this.BASE_URL + this.CREATE_COMPLAIN, data).pipe(
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
complainResidetGet(data): Observable<any> {
  return this._http.post(this.BASE_URL + this.RESIDENT_GET_COMPLAIN, data).pipe(
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
complainSocietyGet(data): Observable<any> {
  return this._http.post(this.BASE_URL + this.GET_SOCIETY_COMPLAIN_LIST, data).pipe(
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
