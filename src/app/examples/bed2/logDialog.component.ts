import { Component,  OnInit, Inject } from '@angular/core';
import { MfoService } from '../services/mfo.service';
import * as moment from 'moment';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


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
    beds: number;

    columnDefs = [
        {headerName: 'Date', field: 'date', width: 120, cellRenderer: (data) => {
          
            return moment(data.value).format('MM/DD/YYYY HH:mm')
        }},
        {headerName: 'Logs', field: 'message', width: 580,}
    ];

    constructor(private mfoService: MfoService,public dialogRef: MatDialogRef<logDialog>,@Inject(MAT_DIALOG_DATA) public data: any){
        console.log('data', this.data);
    }
     ngOnInit() {
         console.log(this.data.beds);
        this.mfoService.getLogs(this.data.beds).subscribe(data =>{
            this.rowData = data;
            console.log(this.rowData);
          }) 
    }
}