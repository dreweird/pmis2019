import { Component, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { MfoService } from '../services/mfo.service';
import { MatDialog } from '@angular/material';
import { AddObjectDialogComponent } from './addObject-dialog.component';
import 'ag-grid-enterprise';

@Component({
  selector: 'anms-bed1',
  templateUrl: './bed1.component.html',
  styleUrls: ['./bed1.component.css']
})
export class Bed1Component implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
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
    this.mfoService.getMFO().subscribe(data => {
      this.rowData = data;
      console.log(data);
    });
  }

  addObject(params) {
    // console.log(params);
    if (params.colDef.headerName === 'PAP' && params.data !== undefined) {
      const selectedRows = this.gridApi.getSelectedRows();
      console.log(selectedRows);
      const dialogRef = this.dialog.open(AddObjectDialogComponent, {
        data: { data: selectedRows[0], gridApi: this.gridApi }
      });
      return dialogRef.afterClosed();
    }
  }

  
  currencyFormatter(params) {
    let number = parseFloat(params.value);
    if(params.value == undefined){return '';}
    return (number).toLocaleString('en-us', {minimumFractionDigits: 2,maximumFractionDigits: 2});
  }

  percentageFormatter(params) {
    let number = parseFloat(params.value)*100;
    if(number == undefined|| isNaN(number)){return '';}
    return (number).toLocaleString('en-us', {minimumFractionDigits: 2,maximumFractionDigits: 2});   
  }


  constructor(private mfoService: MfoService, private dialog: MatDialog) {
    this.rowSelection = 'single';
    this.columnDefs = [
      // {
      //   headerName: "Group",
      //   cellRenderer: "agGroupCellRenderer",
      //   showRowGroup: true,
      //   pinned: 'left',
      //   field: 'mfo_name'
      // },
      {
        headerName: 'header_main',
        field: 'header_main',
        width: 120,
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'header_program',
        field: 'header_program',
        width: 120,
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'header_mfo',
        field: 'header_mfo',
        width: 120,
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'header_indicator',
        field: 'header_indicator',
        width: 120,
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'header_subindicator',
        field: 'header_subindicator',
        width: 120,
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'mfo_id',
        field: 'mfo_id',
        width: 120,
        rowGroup: true,
        hide: true
      },

      { headerName: 'Description', field: 'name', width: 150, pinned: 'left' },
      { headerName: 'UACS Object Code', field: 'object_id', width: 100 },
      { headerName: 'Original Allotment', field: 'budget', width: 100, 
      aggFunc: "sum", valueFormatter: this.currencyFormatter, type: "numericColumn" },
      { headerName: 'Adjustment', field: 'adjustment', width: 100, editable: true,
      aggFunc: "sum", valueFormatter: this.currencyFormatter, type: "numericColumn" },
      {
        headerName: 'Adjusted Allotment',
        field: '',
        width: 100,
        cellStyle: { color: 'white', 'background-color': '#b23c9a' },
        aggFunc: "sum",
        valueGetter: "Number(data.budget) + Number(data.adjustment) ",
        valueFormatter: this.currencyFormatter,
        type: "valueColumn" 
      },
      {
        headerName: 'Jan',
        field: 'jan',
        width: 70,
        editable: true,
        valueFormatter: this.currencyFormatter,
        type: "valueColumn",
        onCellValueChanged: function(event) {
          if (isNaN(+event.newValue)) {
            alert('Invalid entry...input numbers only');
            event.newValue = null;
          }
          console.log(event.newValue);
        }
      },
      { headerName: 'Feb', field: 'feb', width: 70, editable: true,valueFormatter: this.currencyFormatter, type: "valueColumn" },
      { headerName: 'Mar', field: 'mar', width: 70, editable: true,valueFormatter: this.currencyFormatter, type: "valueColumn" },
      {
        headerName: 'Q1',
        width: 70,
        cellStyle: { color: 'white', 'background-color': '#5472d3' },
        valueGetter: "Number(data.jan) + Number(data.feb) + Number(data.mar)",
        valueFormatter: this.currencyFormatter,
        type: "numericColumn"
      },
      { headerName: 'Apr', field: 'apr', width: 70, editable: true,valueFormatter: this.currencyFormatter, type: "valueColumn" },
      { headerName: 'May', field: 'may', width: 70, editable: true,valueFormatter: this.currencyFormatter, type: "valueColumn" },
      { headerName: 'Jun', field: 'jun', width: 70, editable: true,valueFormatter: this.currencyFormatter, type: "valueColumn" },
      {
        headerName: 'Q2',
        width: 70,
        cellStyle: { color: 'white', 'background-color': '#5472d3' },
        valueGetter: "Number(data.apr) + Number(data.may) + Number(data.jun)",
        valueFormatter: this.currencyFormatter,
        type: "numericColumn"
      },
      { headerName: 'Jul', field: 'jul', width: 70, editable: true,valueFormatter: this.currencyFormatter, type: "valueColumn" },
      { headerName: 'Aug', field: 'aug', width: 70, editable: true,valueFormatter: this.currencyFormatter, type: "valueColumn" },
      { headerName: 'Sep', field: 'sep', width: 70, editable: true,valueFormatter: this.currencyFormatter, type: "valueColumn" },
      {
        headerName: 'Q3',
        width: 70,
        cellStyle: { color: 'white', 'background-color': '#5472d3' },
        valueGetter: "Number(data.jul) + Number(data.aug) + Number(data.sep)",
        valueFormatter: this.currencyFormatter,
        type: "numericColumn"
      },
      { headerName: 'Oct', field: 'oct', width: 70, editable: true,valueFormatter: this.currencyFormatter, type: "valueColumn" },
      { headerName: 'Nov', field: 'nov', width: 70, editable: true,valueFormatter: this.currencyFormatter, type: "valueColumn" },
      { headerName: 'Dec', field: 'decm', width: 70, editable: true,valueFormatter: this.currencyFormatter, type: "valueColumn" },
      {
        headerName: 'Q4',
        width: 70,
        cellStyle: { color: 'white', 'background-color': '#5472d3' },
        valueGetter: "Number(data.oct) + Number(data.nov) + Number(data.decm)",
        valueFormatter: this.currencyFormatter,
        type: "numericColumn"
      },
      {
        headerName: 'Total Obligations',
        width: 70,
        cellStyle: { color: 'white', 'background-color': '#ef7109' },
        valueGetter: "Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.decm)",
        valueFormatter: this.currencyFormatter,
        type: "totalColumn"
      },
      {
        headerName: 'Unobligated',
        field: '',
        width: 70,
        cellStyle: { color: 'white', 'background-color': '#e83525' },
        valueGetter: "Number(data.budget) - (Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.decm))",
        valueFormatter: this.currencyFormatter,
        type: "totalColumn"
      },
      { 
        headerName: 'Fund Utilization',  width: 70,
        valueGetter: "(Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.decm)) / (Number(data.budget) + Number(data.adjustment))",
        valueFormatter: this.percentageFormatter,
        type: "totalColumn",

      }
    ];
    this.autoGroupColumnDef = {
      headerName: 'PAP',
      cellRenderer: 'agGroupCellRenderer',
      pinned: 'left',
      width: 300,
      field: 'mfo_name',
      cellRendererParams: {
        suppressCount: true, // turn off the row count
        innerRenderer: 'simpleCellRenderer'
      }
    };
    this.columnTypes = {
      valueColumn: {
        width: 100,
        aggFunc: "sum",
        valueParser: "Number(newValue)",
        cellClass: "number-cell",
        valueFormatter: this.currencyFormatter
      },
      totalColumn: {
        aggFunc: "sum",
        cellRenderer: "agAnimateShowChangeCellRenderer",
        cellClass: "number-cell",
        valueFormatter: this.currencyFormatter
      }
    };
    this.components = { simpleCellRenderer: getSimpleCellRenderer() };
  }

  ngOnInit() {}
}

function getSimpleCellRenderer() {
  function SimpleCellRenderer() {}
  SimpleCellRenderer.prototype.init = function(params) {
    const tempDiv = document.createElement('div');
    // console.log(params.node);
    if (params.node.group && params.node.field === 'mfo_id') {
      // alert(params.node.field);
      tempDiv.innerHTML =
        '<span>' + params.node.allLeafChildren[0].data.mfo_name + '</span>';
    } else if (params.node.group) {
      tempDiv.innerHTML =
        '<span style="font-weight: bold">' + params.value + '</span>';
    } else {
      // console.log(params);
      tempDiv.innerHTML = '<span>' + params.value + '</span>';
    }
    this.eGui = tempDiv.firstChild;
  };
  SimpleCellRenderer.prototype.getGui = function() {
    return this.eGui;
  };
  return SimpleCellRenderer;
}
