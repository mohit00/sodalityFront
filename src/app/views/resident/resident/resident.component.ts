import { Component, OnInit } from '@angular/core';
import { TablesService } from 'app/views/manage-society/manage-society.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.scss']
})
export class ResidentComponent implements OnInit {
  rows = [];
  columns = [];
  temp = [];

  constructor(private service: TablesService,private Router:Router) { }

  ngOnInit() {
    this.columns = this.service.getDataConf();
     
     this.getStaffList();
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
  familyMemberList(data){
    sessionStorage.setItem(this.service.FAMILY_Owner_UUID,data)
  this.Router.navigate(['Resident/Family/Member/List']);

  }
  editStaff(data){
sessionStorage.setItem('detailUuid',data);
this.Router.navigate(['Resident/Update']);
  }
  getStaffList(){
    this.service.getResidentList().subscribe(res=>{
      console.log(JSON.stringify(res.data))
        this.rows = this.temp =res.data;
    })
  }
}