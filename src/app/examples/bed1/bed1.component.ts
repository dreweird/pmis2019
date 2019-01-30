import { Component, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { MfoService } from '../services/mfo.service';
import { MatDialog } from '@angular/material';
import { AddObjectDialogComponent } from './addObject-dialog.component';
import 'ag-grid-enterprise';
import { logDialog } from '../bed2/logDialog.component';

@Component({
  selector: 'anms-bed1',
  templateUrl: './bed1.component.html',
  styleUrls: ['./bed1.component.css']
})
export class Bed1Component implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  gridApi: any;
  gridColumnApi: any;
  rowData: any;
  columnDefs: any;
  autoGroupColumnDef: any;
  components: any;
  rowSelection: any;
  columnTypes: any;
  date_updated: any;

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.mfoService.getMFO().subscribe(data => {
      this.rowData = data;
      console.log(data);
    });
  }


  groupRowAggNodes(nodes: any) {
    const result = {
      to_t: 0,
      to: 0,
      fu: 0,
      un: 0,
      adjusted: 0,
      budget: 0,
      adjustment: 0,
      Q1: 0,
      Q2: 0,
      Q3: 0,
      Q4: 0,
      Q1_t: 0,
      Q2_t: 0,
      Q3_t: 0,
      Q4_t: 0,
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      decm: 0,
      jan_t: 0,
      feb_t: 0,
      mar_t: 0,
      apr_t: 0,
      may_t: 0,
      jun_t: 0,
      jul_t: 0,
      aug_t: 0,
      sep_t: 0,
      oct_t: 0,
      nov_t: 0,
      dec_t: 0
    };
    nodes.forEach(function(node: any) {
      const data = node.group ? node.aggData : node.data;
      if (typeof data.adjustment === 'number') {
        result.adjustment += data.adjustment;
      }
      if (typeof data.budget === 'number') {
        result.budget += data.budget;
      }
      if (
        typeof data.budget === 'number' &&
        typeof data.adjustment === 'number'
      ) {
        result.adjusted += data.budget + data.adjustment;
      }
      if (typeof data.jan_t === 'number') {
        result.jan_t += data.jan_t;
      }
      if (typeof data.feb_t === 'number') {
        result.feb_t += data.feb_t;
      }
      if (typeof data.mar_t === 'number') {
        result.mar_t += data.mar_t;
      }
      if (typeof data.apr_t === 'number') {
        result.apr_t += data.apr_t;
      }
      if (typeof data.may_t === 'number') {
        result.may_t += data.may_t;
      }
      if (typeof data.jun_t === 'number') {
        result.jun_t += data.jun_t;
      }
      if (typeof data.jul_t === 'number') {
        result.jul_t += data.jul_t;
      }
      if (typeof data.aug_t === 'number') {
        result.aug_t += data.aug_t;
      }
      if (typeof data.sep_t === 'number') {
        result.sep_t += data.sep_t;
      }
      if (typeof data.oct_t === 'number') {
        result.oct_t += data.oct_t;
      }
      if (typeof data.nov_t === 'number') {
        result.nov_t += data.nov_t;
      }
      if (typeof data.dec_t === 'number') {
        result.dec_t += data.dec_t;
      }
      if (typeof data.jan === 'number') {
        result.jan += data.jan;
      }
      if (typeof data.feb === 'number') {
        result.feb += data.feb;
      }
      if (typeof data.mar === 'number') {
        result.mar += data.mar;
      }
      if (typeof data.apr === 'number') {
        result.apr += data.apr;
      }
      if (typeof data.may === 'number') {
        result.may += data.may;
      }
      if (typeof data.jun === 'number') {
        result.jun += data.jun;
      }
      if (typeof data.jul === 'number') {
        result.jul += data.jul;
      }
      if (typeof data.aug === 'number') {
        result.aug += data.aug;
      }
      if (typeof data.sep === 'number') {
        result.sep += data.sep;
      }
      if (typeof data.oct === 'number') {
        result.oct += data.oct;
      }
      if (typeof data.nov === 'number') {
        result.nov += data.nov;
      }
      if (typeof data.decm === 'number') {
        result.decm += data.decm;
      }
      result.Q1_t += Number(data.jan_t) + Number(data.feb_t) + Number(data.mar_t);
      result.Q2_t += Number(data.apr_t) + Number(data.may_t) + Number(data.jun_t);
      result.Q3_t += Number(data.jul_t) + Number(data.aug_t) + Number(data.sep_t);
      result.Q4_t += Number(data.oct_t) + Number(data.nov_t) + Number(data.dec_t);
      result.Q1 += Number(data.jan) + Number(data.feb) + Number(data.mar);
      result.Q2 += Number(data.apr) + Number(data.may) + Number(data.jun);
      result.Q3 += Number(data.jul) + Number(data.aug) + Number(data.sep);
      result.Q4 += Number(data.oct) + Number(data.nov) + Number(data.decm);
      result.to +=
        Number(data.jan) +
        Number(data.feb) +
        Number(data.mar) +
        Number(data.apr) +
        Number(data.may) +
        Number(data.jun) +
        Number(data.jul) +
        Number(data.aug) +
        Number(data.sep) +
        Number(data.oct) +
        Number(data.nov) +
        Number(data.decm);
      result.to_t +=
        Number(data.jan_t) +
        Number(data.feb_t) +
        Number(data.mar_t) +
        Number(data.apr_t) +
        Number(data.may_t) +
        Number(data.jun_t) +
        Number(data.jul_t) +
        Number(data.aug_t) +
        Number(data.sep_t) +
        Number(data.oct_t) +
        Number(data.nov_t) +
        Number(data.dec_t);
      result.un = result.adjusted - result.to;
      result.fu = result.to / result.adjusted;

    });
    return result;
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
    const number = parseFloat(params.value);
    if (params.value === undefined || params.value === null) {
      return null;
    }
    return number.toLocaleString('en-us', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  percentageFormatter(params) {
    const number = parseFloat(params.value) * 100;
    if (number === undefined || isNaN(number)) {
      return 0;
    }
    return number.toLocaleString('en-us', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  updateLogs(id: number, value: number, col: string, month: string) {
    const uid = JSON.parse(localStorage.getItem('currentUser'));
    this.mfoService
      .updateLogs(id, value, uid.user_id, col, month, 1,null,null,null)
      .subscribe(data => console.log(data));
    this.lastUpdated();
  }

  lastUpdated() {
    this.mfoService.getLastUpdated(1).subscribe(data => {
      this.date_updated = data[0].date;
    });
  }

  getLogs(){
    this.dialog.open(logDialog, {
      data: {beds: 1}
    });
  }

  onCellValueChanged(event: any) {
    if (isNaN(+event.newValue)) {
      alert('Invalid entry...input numbers only');
      event.newValue = null;
    } else {
      this.updateLogs(event.data.mfo_id, event.newValue, event.data.mfo_name, event.colDef.field);
      this.mfoService
        .updateAllotment(
          event.data.id,
          event.newValue,
          event.colDef.field
        )
        .subscribe(data => {
          console.log(data);
        });
    }
  }

  constructor(private mfoService: MfoService, private dialog: MatDialog) {
    this.rowSelection = 'single';
    this.columnDefs = [
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
      {
        headerName: 'Original Allotment',
        field: 'budget',
        width: 100,
        valueFormatter: this.currencyFormatter,
        type: 'numericColumn'
      },
      {
        headerName: 'Adjustment',
        field: 'adjustment',
        width: 100,
        editable: true,
        valueFormatter: this.currencyFormatter,
        type: 'numericColumn',

      },
      {
        headerName: 'Adjusted Allotment',
        field: 'adjusted',
        width: 100,
        cellStyle: { color: 'white', 'background-color': '#b23c9a' },
        valueGetter: 'Number(data.budget) + Number(data.adjustment) ',
        valueFormatter: this.currencyFormatter,
        type: 'valueColumn'
      },
      {
        headerName: 'Financial Target',
        children: [
          {
            headerName: "Jan",
            field: 'jan_t',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn',
   
          },
          {
            headerName: "Feb",
            field: 'feb_t',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn',
        
          },
          {
            headerName: "Mar",
            field: 'mar_t',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn',
        
          },
          {
            headerName: "Q1",
            field: 'Q1_t',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#4b830d' },
            valueGetter:
            'Number(data.jan_t) + Number(data.feb_t) + Number(data.mar_t)'
         
          },
          {
            headerName: "Apr",
            field: 'apr_t',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn',
            
          },
          {
            headerName: "May",
            field: 'may_t',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn',
            
          },
          {
            headerName: "Jun",
            field: 'jun_t',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn',
            
          },
          {
            headerName: "Q2",
            field: 'Q2_t',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#4b830d' },
            valueGetter:
              'Number(data.apr_t) + Number(data.may_t) + Number(data.jun_t)',
          },
          {
            headerName: "Jul",
            field: 'jul_t',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            headerName: "Aug",
            field: 'aug_t',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            headerName: "Sep",
            field: 'sep_t',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            headerName: "Q3",
            field: 'Q3_t',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#4b830d' },
            valueGetter:
              'Number(data.jul_t) + Number(data.aug_t) + Number(data.sep_t)',
          },
          {
            headerName: "Oct",
            field: 'oct_t',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            headerName: "Nov",
            field: 'nov_t',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            headerName: "Dec",
            field: 'dec_t',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            headerName: "Q4",
            field: 'Q4_t',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#4b830d' },
            valueGetter:
              'Number(data.oct_t) + Number(data.nov_t) + Number(data.dec_t)',
          },
          {
            headerName: "Total",
            field: 'to_t',
            width: 70,
            columnGroupShow: 'closed',
            cellStyle: { color: 'white', 'background-color': '#ef7109' },
            valueGetter:
              'Number(data.jan_t) + Number(data.feb_t) + Number(data.mar_t) + Number(data.apr_t) + Number(data.may_t) + Number(data.jun_t) + Number(data.jul_t) + Number(data.aug_t) + Number(data.sep_t) + Number(data.oct_t) + Number(data.nov_t) + Number(data.dec_t)',
            type: 'totalColumn'
          }
      ]
      },
      {
        headerName: 'Financial Accomplishment',
        children: [
          {
            headerName: 'Jan',
            field: 'jan',
            width: 70,
            editable: true,
            valueFormatter: this.currencyFormatter,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Feb',
            field: 'feb',
            width: 70,
            editable: true,
            valueFormatter: this.currencyFormatter,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Mar',
            field: 'mar',
            width: 70,
            editable: true,
            valueFormatter: this.currencyFormatter,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Q1',
            field: 'Q1',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            valueGetter: 'Number(data.jan) + Number(data.feb) + Number(data.mar)',
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn'
          },
          {
            headerName: 'Apr',
            field: 'apr',
            width: 70,
            editable: true,
            valueFormatter: this.currencyFormatter,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'May',
            field: 'may',
            width: 70,
            editable: true,
            valueFormatter: this.currencyFormatter,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Jun',
            field: 'jun',
            width: 70,
            editable: true,
            valueFormatter: this.currencyFormatter,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Q2',
            field: 'Q2',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            valueGetter: 'Number(data.apr) + Number(data.may) + Number(data.jun)',
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn'
          },
          {
            headerName: 'Jul',
            field: 'jul',
            width: 70,
            editable: true,
            valueFormatter: this.currencyFormatter,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Aug',
            field: 'aug',
            width: 70,
            editable: true,
            valueFormatter: this.currencyFormatter,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Sep',
            field: 'sep',
            width: 70,
            editable: true,
            valueFormatter: this.currencyFormatter,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Q3',
            field: 'Q3',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            valueGetter: 'Number(data.jul) + Number(data.aug) + Number(data.sep)',
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn'
          },
          {
            headerName: 'Oct',
            field: 'oct',
            width: 70,
            editable: true,
            valueFormatter: this.currencyFormatter,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Nov',
            field: 'nov',
            width: 70,
            editable: true,
            valueFormatter: this.currencyFormatter,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Dec',
            field: 'decm',
            width: 70,
            editable: true,
            valueFormatter: this.currencyFormatter,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Q4',
            field: 'Q4',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            valueGetter: 'Number(data.oct) + Number(data.nov) + Number(data.decm)',
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn'
          },
          {
            headerName: 'Total Obligations',
            field: 'to',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#ef7109' },
            valueGetter:
              'Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.decm)',
            valueFormatter: this.currencyFormatter,
            type: 'totalColumn'
          }
        ]
      },
      
      {
        headerName: 'Unobligated',
        field: 'un',
        width: 70,
        cellStyle: { color: 'white', 'background-color': '#e83525' },
        valueGetter:
          '(Number(data.budget) + Number(data.adjustment)) - (Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.decm))',
        valueFormatter: this.currencyFormatter,
        type: 'totalColumn'
      },
      {
        headerName: '% Utilization',
        field: 'fu',
        width: 70,
        valueGetter:
          '(Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.decm)) / (Number(data.budget) + Number(data.adjustment))',
        valueFormatter: this.percentageFormatter,
        type: 'totalColumn'
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
        aggFunc: 'sum',
        valueParser: 'Number(newValue)',
        cellClass: 'number-cell',
        valueFormatter: this.currencyFormatter
      },
      totalColumn: {
        aggFunc: 'sum',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellClass: 'number-cell',
        valueFormatter: this.currencyFormatter
      }
    };
    this.components = { simpleCellRenderer: getSimpleCellRenderer() };
  }

  ngOnInit() {
    this.lastUpdated()
  }
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
