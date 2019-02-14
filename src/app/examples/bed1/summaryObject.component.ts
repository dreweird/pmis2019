<<<<<<< HEAD
import { Component, Input, OnChanges } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
=======
import { Component,Input,OnChanges } from '@angular/core';
>>>>>>> d05735b20e083b27ddef42bb0d923292f61a1432
import { MfoService } from '../services/mfo.service';

@Component({
  selector: 'summary-object',
  template: `
  <div  class="col-md-2">
    <button style="margin:5px;" mat-raised-button class="information" (click)="recalc()">
      RECALCULATE
    </button> 
    <br>
  </div>
    <ag-grid-angular
      style="width: 100%; height: 250px;"
      class="ag-theme-balham"
      [rowData]="rowData"
      [columnDefs]="columnDefs"
      [columnTypes]="columnTypes"
      [autoGroupColumnDef]="autoGroupColumnDef"
      [enableSorting]="true"
      [enableFilter]="true"
      [groupRowAggNodes]="groupRowAggNodes"
      [enableColResize]="true"
      [rowSelection]="rowSelection"
      [suppressAggFuncInHeader]="true"
      (gridReady)="onGridReady($event)"
    >
    </ag-grid-angular>
  `
})
export class SummaryObjectComponent implements OnChanges{
<<<<<<< HEAD

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
=======
  @Input() gridApiParent:any;
  @Input() pid:number = 0;
>>>>>>> d05735b20e083b27ddef42bb0d923292f61a1432
  gridApi: any;
  gridColumnApi: any;
  rowData: any;
  columnDefs: any;
  autoGroupColumnDef: any;
  components: any;
  rowSelection: any;
  columnTypes: any;
<<<<<<< HEAD
  groupRowAggNodes;
  user: any;
  @Input() pid: number = 0;
=======
  user:any;
  private groupRowAggNodes;
>>>>>>> d05735b20e083b27ddef42bb0d923292f61a1432

  
  ngOnChanges(changes:any) {
    console.log(changes.pid.currentValue);
    this.mfoService.getSummaryObject(changes.pid.currentValue).subscribe(data => {
      this.rowData = data;
      console.log(data);
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    if(this.pid===0) this.pid = this.user.pid;
    this.mfoService.getSummaryObject(this.pid).subscribe(data => {
      this.rowData = data;
      console.log(data);
    });
  }
  recalc(){
    if(this.pid===0) this.pid = this.user.pid;
    this.mfoService.getSummaryObject(this.pid).subscribe(data => {
      this.rowData = data;
    });
  }
  currencyFormatter(params: any) {
    const number = parseFloat(params.value);
    if (params.value === undefined || params.value === null) {
      return null;
    }
    return number.toLocaleString('en-us', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  percentageFormatter(params: any) {
    const number = parseFloat(params.value) * 100;
    if (number === undefined || isNaN(number)) {
      return 0;
    }
    return number.toLocaleString('en-us', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  constructor(private mfoService: MfoService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.columnDefs = [
      { headerName: 'Summary', field: 'header', rowGroup: true, hide: true },
      { headerName: 'Type', field: 'type', rowGroup: true, hide: true },
      {
        headerName: 'Object Code',
        field: 'object_id',
        width: 100,
        pinned: 'left'
      },
      { headerName: 'Description', field: 'name', width: 100, pinned: 'left' },
      {
        headerName: 'Original Allotment',
        field: 'budget',
        width: 70,
        aggFunc: 'sum',
        valueFormatter: this.currencyFormatter
      },
      {
        headerName: 'Adjustment',
        field: 'adj',
        width: 70,
        aggFunc: 'sum',
        valueFormatter: this.currencyFormatter
      },
      {
        headerName: 'Adjusted Allotment',
        field: 'adjusted',
        width: 70,
        cellStyle: { color: 'white', 'background-color': '#b23c9a' },
        aggFunc: 'sum',
        valueFormatter: this.currencyFormatter,
        valueGetter: 'Number(data.budget) + Number(data.adj)'
      },
      {
        headerName: "Obligations",
        children: [
          {
            headerName: 'Jan',
            field: 'jan',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'Feb',
            field: 'feb',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'Mar',
            field: 'mar',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'Q1',
            field: 'Q1',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            aggFunc: 'sum',
            valueFormatter: this.currencyFormatter,
            valueGetter: 'Number(data.jan) + Number(data.feb) + Number(data.mar)'
          },
          {
            headerName: 'Apr',
            field: 'apr',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'May',
            field: 'may',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'Jun',
            field: 'jun',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'Q2',
            field: 'Q2',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            aggFunc: 'sum',
            valueFormatter: this.currencyFormatter,
            valueGetter: 'Number(data.apr) + Number(data.may) + Number(data.jun)'
          },
          {
            headerName: 'Jul',
            field: 'jul',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'Aug',
            field: 'aug',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'Sep',
            field: 'sep',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'Q3',
            field: 'Q3',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            aggFunc: 'sum',
            valueFormatter: this.currencyFormatter,
            valueGetter: 'Number(data.jul) + Number(data.aug) + Number(data.sep)'
          },
          {
            headerName: 'Oct',
            field: 'oct',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'Nov',
            field: 'nov',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'Dec',
            field: 'decm',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'Q4',
            field: 'Q4',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            aggFunc: 'sum',
            valueFormatter: this.currencyFormatter,
            valueGetter: 'Number(data.oct) + Number(data.nov) + Number(data.decm)'
          },
          {
            headerName: 'Total',
            field: 'to',
            width: 70,
            aggFunc: 'sum',
            valueFormatter: this.currencyFormatter,
            cellStyle: { color: 'white', 'background-color': '#ef7109' },
            valueGetter:
              'Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.decm)'
          },
          {
            headerName: 'Unobligated',
            field: 'un',
            width: 70,
            aggFunc: 'sum',
            valueFormatter: this.currencyFormatter,
            cellStyle: { color: 'white', 'background-color': '#e83525' },
            valueGetter:
              '(Number(data.budget) + Number(data.adj)) - (Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.decm))'
          },
          {
            headerName: '% Utilization',
            field: 'fu',
            width: 70,
            valueFormatter: this.percentageFormatter,
            cellStyle: { color: 'black', 'background-color': 'yellow' },

            valueGetter:
              '(Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.decm)) / (Number(data.budget) + Number(data.adj))',
            aggFunc: 'avg'
          }
        ]
      },
      {
        headerName: "Disbursement",
        children: [
          {
            headerName: 'Jan',
            field: 'jan_da',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'Feb',
            field: 'feb_da',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'Mar',
            field: 'mar_da',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'Q1',
            field: 'Q1_da',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            aggFunc: 'sum',
            valueFormatter: this.currencyFormatter,
            valueGetter: 'Number(data.jan_da) + Number(data.feb_da) + Number(data.mar_da)'
          },
          {
            headerName: 'Apr',
            field: 'apr_da',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'May',
            field: 'may_da',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'Jun',
            field: 'jun_da',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'Q2',
            field: 'Q2_da',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            aggFunc: 'sum',
            valueFormatter: this.currencyFormatter,
            valueGetter: 'Number(data.apr_da) + Number(data.may_da) + Number(data.jun_da)'
          },
          {
            headerName: 'Jul',
            field: 'jul_da',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'Aug',
            field: 'aug_da',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'Sep',
            field: 'sep_da',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'Q3',
            field: 'Q3_da',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            aggFunc: 'sum',
            valueFormatter: this.currencyFormatter,
            valueGetter: 'Number(data.jul_da) + Number(data.aug_da) + Number(data.sep_da)'
          },
          {
            headerName: 'Oct',
            field: 'oct_da',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'Nov',
            field: 'nov_da',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'Dec',
            field: 'dec_da',
            width: 70,
            aggFunc: 'sum',
            columnGroupShow: 'open',
            valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'Q4',
            field: 'Q4_da',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            aggFunc: 'sum',
            valueFormatter: this.currencyFormatter,
            valueGetter: 'Number(data.oct_da) + Number(data.nov_da) + Number(data.dec_da)'
          },
          {
            headerName: 'Total',
            field: 'disbursement_total',
            width: 70,
            aggFunc: 'sum',
            cellStyle: { color: 'white', 'background-color': '#ef7109' },
            valueFormatter: this.currencyFormatter,
            valueGetter:
              'Number(data.jan_da) + Number(data.feb_da) + Number(data.mar_da) + Number(data.apr_da) + Number(data.may_da) + Number(data.jun_da) + Number(data.jul_da) + Number(data.aug_da) + Number(data.sep_da) + Number(data.oct_da) + Number(data.nov_da) + Number(data.dec_da)'
          },
          {
            headerName: 'Unpaid Obligations',
            field: 'disbursement_balance',
            width: 70,
            aggFunc: 'sum',
            valueFormatter: this.currencyFormatter,
            cellStyle: { color: 'white', 'background-color': '#e83525' },
            valueGetter:
              `(Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.decm))
              - (Number(data.jan_da) + Number(data.feb_da) + Number(data.mar_da) + Number(data.apr_da) + Number(data.may_da) + Number(data.jun_da) + Number(data.jul_da) + Number(data.aug_da) + Number(data.sep_da) + Number(data.oct_da) + Number(data.nov_da) + Number(data.dec_da))`
          },
          {
            headerName: '% Utilization',
            field: 'disbursement_util',
            width: 70,
            valueFormatter: this.percentageFormatter,
            cellStyle: { color: 'black', 'background-color': 'yellow' },
            valueGetter:
            '(Number(data.jan_da) + Number(data.feb_da) + Number(data.mar_da) + Number(data.apr_da) + Number(data.may_da) + Number(data.jun_da) + Number(data.jul_da) + Number(data.aug_da) + Number(data.sep_da) + Number(data.oct_da) + Number(data.nov_da) + Number(data.dec_da))/ (Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.decm)) ',
             aggFunc: 'avg'
          }
        ]
      }
     
    ];

    this.autoGroupColumnDef = {
      headerName: 'Summary Objects',
      cellRenderer: 'agGroupCellRenderer',
      pinned: 'left',
      width: 130,
      field: 'mfo_name',
      cellRendererParams: {
        suppressCount: true // turn off the row count
        //  innerRenderer: 'simpleCellRenderer'
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

    this.groupRowAggNodes = function groupRowAggNodes(nodes) {
      var result = {
        to:0,fu:0,un:0,
        adjusted: 0,
        budget:0,
        disbursement_total: 0,
        disbursement_balance: 0,
        disbursement_util: 0,
        adj:0,
        Q1:0,
        Q2:0,
        Q3:0,
        Q4:0,
        jan:0,
        feb:0,
        mar:0,
        apr:0,
        may:0,
        jun:0,
        jul:0,
        aug:0,
        sep:0,
        oct:0,
        nov:0,
        decm:0,
        Q1_da:0,
        Q2_da:0,
        Q3_da:0,
        Q4_da:0,
        jan_da:0,
        feb_da:0,
        mar_da:0,
        apr_da:0,
        may_da:0,
        jun_da:0,
        jul_da:0,
        aug_da:0,
        sep_da:0,
        oct_da:0,
        nov_da:0,
        dec_da:0,
      };
      nodes.forEach(function(node) {
        var data = node.group ? node.aggData : node.data;
        //console.log(data);
        if (typeof data.adj === "number") {
          result.adj += data.adj;
        }
        if (typeof data.budget === "number") {
          result.budget += data.budget;
        }
        if (typeof data.budget === "number"&&typeof data.adj === "number") {
          result.adjusted += data.budget+ data.adj;
        }
        if (typeof data.jan === "number") {
          result.jan += data.jan;
        }
        if (typeof data.feb === "number") {
          result.feb += data.feb;
        }
        if (typeof data.mar === "number") {
          result.mar += data.mar;
        }
        if (typeof data.apr === "number") {
          result.apr += data.apr;
        }
        if (typeof data.may === "number") {
          result.may += data.may;
        }
        if (typeof data.jun === "number") {
          result.jun += data.jun;
        }
        if (typeof data.jul === "number") {
          result.jul += data.jul;
        }
        if (typeof data.aug === "number") {
          result.aug += data.aug;
        }
        if (typeof data.sep === "number") {
          result.sep += data.sep;
        }
        if (typeof data.oct === "number") {
          result.oct += data.oct;
        }
        if (typeof data.nov === "number") {
          result.nov += data.nov;
        }
        if (typeof data.decm === "number") {
          result.decm += data.decm;
        }
        if (typeof data.jan_da === "number") {
          result.jan_da += data.jan_da;
        }
        if (typeof data.feb_da === "number") {
          result.feb_da += data.feb_da;
        }
        if (typeof data.mar_da === "number") {
          result.mar_da += data.mar_da;
        }
        if (typeof data.apr_da === "number") {
          result.apr_da += data.apr_da;
        }
        if (typeof data.may_da === "number") {
          result.may_da += data.may_da;
        }
        if (typeof data.jun_da === "number") {
          result.jun_da += data.jun_da;
        }
        if (typeof data.jul_da === "number") {
          result.jul_da += data.jul_da;
        }
        if (typeof data.aug_da === "number") {
          result.aug_da += data.aug_da;
        }
        if (typeof data.sep_da === "number") {
          result.sep_da += data.sep_da;
        }
        if (typeof data.oct_da === "number") {
          result.oct_da += data.oct_da;
        }
        if (typeof data.nov_da === "number") {
          result.nov_da += data.nov_da;
        }
        if (typeof data.dec_da === "number") {
          result.dec_da += data.dec_da;
        }
        result.Q1 += Number(data.jan) + Number(data.feb) + Number(data.mar);
        result.Q2 += Number(data.apr) + Number(data.may) + Number(data.jun);
        result.Q3 += Number(data.jul) + Number(data.aug) + Number(data.sep);
        result.Q4 += Number(data.oct) + Number(data.nov) + Number(data.decm);
        result.Q1_da += Number(data.jan_da) + Number(data.feb_da) + Number(data.mar_da);
        result.Q2_da += Number(data.apr_da) + Number(data.may_da) + Number(data.jun_da);
        result.Q3_da += Number(data.jul_da) + Number(data.aug_da) + Number(data.sep_da);
        result.Q4_da += Number(data.oct_da) + Number(data.nov_da) + Number(data.dec_da);
        result.to+=Number(data.jan) + Number(data.feb) + Number(data.mar)+Number(data.apr) + Number(data.may) + Number(data.jun)+Number(data.jul) + Number(data.aug) + Number(data.sep)+Number(data.oct) + Number(data.nov) + Number(data.decm);
        result.disbursement_total += Number(data.jan_da) + Number(data.feb_da) + Number(data.mar_da)+Number(data.apr_da) + Number(data.may_da) + Number(data.jun_da)+Number(data.jul_da) + Number(data.aug_da) + Number(data.sep_da)+Number(data.oct_da) + Number(data.nov_da) + Number(data.dec_da)
        result.un = result.adjusted-result.to;
        result.fu = result.to/result.adjusted;
        result.disbursement_balance = result.disbursement_total - result.to;
        result.disbursement_util = result.disbursement_total / result.to;

      });
      return result;
    };
  }
}
