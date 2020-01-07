import { Component, OnInit } from '@angular/core';
import { TablesService } from 'app/views/manage-society/manage-society.service';
import { Router,NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  rows = [];
  columns = [];
  temp = [];
  constructor(private service: TablesService,private Router:Router) { }
  ngOnInit() {
   
    this.columns = this.service.getDataConf();
     
     this.getCategoryList();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.temp[0]);
    // Removes last "$$index" from "column"
    columns.splice(columns.length - 1);
    // console.log(columns);
    if (!columns.length)
      return;
    const rows = this.temp.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.rows = rows;
  }

  editGroup(data){
 
    sessionStorage.setItem('detailUuid',data);
    this.Router.navigate(['Group/Update' ]);  
  }

  getCategoryList() {
 
    this.service.groupGet((sessionStorage.getItem('uuId'))).subscribe(res=>{
        console.log(JSON.stringify(res))
        this.rows = this.temp =res;
      })
  }
}
