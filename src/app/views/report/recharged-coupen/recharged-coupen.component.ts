import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recharged-coupen',
  templateUrl: './recharged-coupen.component.html',
  styleUrls: ['./recharged-coupen.component.scss']
})
export class RechargedCoupenComponent implements OnInit {


  states: string[] = [
    'Alabama', 'Alaska'
  ];

  constructor() {
    }
    selectedStates = this.states; 

   onKey(value) { 
  this.selectedStates = this.search(value);
  }
  
   search(value: string) { 
    let filter = value.toLowerCase();
    return this.states.filter(option => option.toLowerCase().startsWith(filter));
  }
  
  ngOnInit() {
  }

}
