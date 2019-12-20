import { Component, OnInit } from '@angular/core';
import { TablesService } from 'app/views/manage-society/manage-society.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-flat',
  templateUrl: './flat.component.html',
  styleUrls: ['./flat.component.scss']
})
export class FlatComponent implements OnInit {

  rows = [];
  columns = [];
  temp = [];
  towerList: any=[];
  selectedTower: any;

  constructor(private service: TablesService,private Router:Router) { }

  ngOnInit() {
    this.columns = this.service.getDataConf();
     
     this.getTowerList();
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
  editTower(data){
sessionStorage.setItem('detailUuid',data);
this.Router.navigate(['Unit/Update']);
  }

  getSocietyList(data){
    let dataJson = {
      "parentId":data
    }
    this.service.getFlatList(dataJson).subscribe(res=>{
       this.rows = this.temp =res.data;
    })
  }
  getTowerList(){
    this.service.getTowerList().subscribe(res=>{
      console.log(JSON.stringify(res.data))
      this.towerList =res.data;
      this.selectedTower = this.towerList[0].uuid;
      
      this.getSocietyList(this.towerList[0].uuid);

    })

  }
  change(e){
console.log(e);
console.log(e.value)
sessionStorage.setItem('toweruuId',e.value);
this.getSocietyList(e.value);

  }
}