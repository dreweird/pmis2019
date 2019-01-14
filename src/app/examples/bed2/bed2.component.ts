import { Component, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { MfoService } from '../services/mfo.service';

@Component({
  selector: 'anms-bed2',
  templateUrl: './bed2.component.html',
  styleUrls: ['./bed2.component.css']
})
export class Bed2Component implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  gridApi: any;
  gridColumnApi: any;
  rowData: any;
  columnDefs: any;
  autoGroupColumnDef: any;
  components: any;
  rowSelection: any;
  columnTypes: any;

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.mfoService.getMFO().subscribe(data => {
      this.rowData = data;
      console.log(data);
    });
  }

  constructor(private mfoService: MfoService) {
    this.rowSelection = 'single';
    this.columnDefs = [];
  }

  ngOnInit() {}
}
