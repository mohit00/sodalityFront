import { Component, OnInit, ViewChild } from '@angular/core';
import { TablesService } from '../manage-society/manage-society.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss']
})
export class MaterialTableComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  
  displayedColumns: string[] = [];
  dataSource: any;

  constructor(private tableService: TablesService) { }

  ngOnInit() {
    this.displayedColumns = this.tableService.getDataConf().map((c) => c.prop)
    this.dataSource = new MatTableDataSource(this.tableService.getAll());
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
