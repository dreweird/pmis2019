import { Component, Input, OnInit, Inject } from '@angular/core';
import { MfoService } from '../services/mfo.service';
import * as moment from 'moment';



@Component({
  template: `
  <h3 mat-dialog-title>Physical Logs</h3>
  <mat-dialog-content>
  <div class="container">
  <ag-grid-angular 
    style="width: 700px; height: 500px;" 
    class="ag-theme-balham"
    [rowData]="rowData" 
    [columnDefs]="columnDefs"
    [enableColResize]="true"
    [enableSorting]="true"
    >
</ag-grid-angular>
</div>
  </mat-dialog-content>

  `,
})
export class logDialog implements OnInit{

    rowData: any;

    columnDefs = [
        {headerName: 'Date', field: 'date', width: 120, cellRenderer: (data) => {
            console.log(data);
            return moment(data.value).format('MM/DD/YYYY HH:mm')
        }},
        {headerName: 'Logs', field: 'message', width: 580,}
    ];

    constructor(private mfoService: MfoService){

    }
     ngOnInit() {
        this.mfoService.getLogs().subscribe(data =>{
            this.rowData = data;
            console.log(this.rowData);
          }) 
    }
}