import { Component } from '@angular/core';
import { MfoService } from '../services/mfo.service';

@Component({
    selector: 'summary-object',
    template: `
    <ag-grid-angular 
    style="width: 100%; height: 250px;" 
    class="ag-theme-balham"
    [rowData]="rowData" 
    [columnDefs]="columnDefs"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [enableSorting]="true"
    [enableFilter]="true"
    [enableColResize]="true"

 
    [rowSelection]="rowSelection"
    [suppressAggFuncInHeader]= "true"
    (gridReady)="onGridReady($event)"
    >
    </ag-grid-angular>`
})

export class SummaryObjectComponent {

    gridApi;
    gridColumnApi;
    rowData;
    columnDefs;
    autoGroupColumnDef;
    components;
    rowSelection;
    columnTypes;

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.mfoService.getSummaryObject().subscribe(data => {
          this.rowData = data;
          console.log(data);
        });
      }

    constructor(private mfoService: MfoService) {

        this.columnDefs = [
            {headerName: 'Summary', field: 'header', rowGroup: true, hide: true },
            {headerName: 'Type', field: 'type', rowGroup: true, hide: true },
            {headerName: 'Object Code', field: 'object_id', width: 100, pinned: 'left' },
            {headerName: 'Description', field: 'name' , width: 100, pinned: 'left'},
            {headerName: 'Original Allotment', field: 'budget', width: 70},
            {headerName: 'Adjustment', field: 'adj', width: 70},
            {headerName: 'Adjusted Allotment', width: 70, cellStyle: { color: 'white', 'background-color': '#b23c9a' }},
            {headerName: 'Jan', field: 'jan', width: 70},
            {headerName: 'Feb', field: 'feb', width: 70},
            {headerName: 'Mar', field: 'mar', width: 70},
            {headerName: 'Q1', width: 70, cellStyle: { color: 'white', 'background-color': '#5472d3' },},
            {headerName: 'Apr', field: 'apr', width: 70},
            {headerName: 'May', field: 'may', width: 70},
            {headerName: 'Jun', field: 'jun', width: 70},
            {headerName: 'Q2', width:70, cellStyle: { color: 'white', 'background-color': '#5472d3' },},
            {headerName: 'Jul', field: 'jul', width: 70},
            {headerName: 'Aug', field: 'aug', width: 70},
            {headerName: 'Sep', field: 'sep', width: 70},
            {headerName: 'Q3', width: 70, cellStyle: { color: 'white', 'background-color': '#5472d3' },},
            {headerName: 'Oct', field: 'oct', width: 70},
            {headerName: 'Nov', field: 'nov', width: 70},
            {headerName: 'Dec', field: 'dec', width: 70},
            {headerName: 'Q4', width: 70, cellStyle: { color: 'white', 'background-color': '#5472d3' },},
            {headerName: 'Total', field: ''},
            {headerName: 'Unobligated', field: ''},
            {headerName: '% Utilization', field: ''},
        ];

        this.autoGroupColumnDef = {
            headerName: 'Summary Objects',
            cellRenderer: 'agGroupCellRenderer',
            pinned: 'left',
            width: 130,
            field: 'mfo_name',
            cellRendererParams: {
              suppressCount: true, // turn off the row count
              innerRenderer: 'simpleCellRenderer'
            }
          };
    }
}