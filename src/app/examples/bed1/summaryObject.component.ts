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
export class SummaryObjectComponent {
  gridApi: any;
  gridColumnApi: any;
  rowData: any;
  columnDefs: any;
  autoGroupColumnDef: any;
  components: any;
  rowSelection: any;
  columnTypes: any;
  private groupRowAggNodes;

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.mfoService.getSummaryObject().subscribe(data => {
      this.rowData = data;
      console.log(data);
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
        headerName: 'Jan',
        field: 'jan',
        width: 70,
        aggFunc: 'sum',
        valueFormatter: this.currencyFormatter
      },
      {
        headerName: 'Feb',
        field: 'feb',
        width: 70,
        aggFunc: 'sum',
        valueFormatter: this.currencyFormatter
      },
      {
        headerName: 'Mar',
        field: 'mar',
        width: 70,
        aggFunc: 'sum',
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
        valueFormatter: this.currencyFormatter
      },
      {
        headerName: 'May',
        field: 'may',
        width: 70,
        aggFunc: 'sum',
        valueFormatter: this.currencyFormatter
      },
      {
        headerName: 'Jun',
        field: 'jun',
        width: 70,
        aggFunc: 'sum',
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
        valueFormatter: this.currencyFormatter
      },
      {
        headerName: 'Aug',
        field: 'aug',
        width: 70,
        aggFunc: 'sum',
        valueFormatter: this.currencyFormatter
      },
      {
        headerName: 'Sep',
        field: 'sep',
        width: 70,
        aggFunc: 'sum',
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
        valueFormatter: this.currencyFormatter
      },
      {
        headerName: 'Nov',
        field: 'nov',
        width: 70,
        aggFunc: 'sum',
        valueFormatter: this.currencyFormatter
      },
      {
        headerName: 'Dec',
        field: 'decm',
        width: 70,
        aggFunc: 'sum',
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
        valueGetter:
          'Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.decm)'
      },
      {
        headerName: 'Unobligated',
        field: 'un',
        width: 70,
        aggFunc: 'sum',
        valueFormatter: this.currencyFormatter,
        valueGetter:
          '(Number(data.budget) + Number(data.adj)) - (Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.decm))'
      },
      {
        headerName: '% Utilization',
        field: 'fu',
        width: 70,
        valueFormatter: this.percentageFormatter,
        valueGetter:
          '(Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.decm)) / (Number(data.budget) + Number(data.adj))',
        aggFunc: 'avg'
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
        result.Q1 += Number(data.jan) + Number(data.feb) + Number(data.mar);
        result.Q2 += Number(data.apr) + Number(data.may) + Number(data.jun);
        result.Q3 += Number(data.jul) + Number(data.aug) + Number(data.sep);
        result.Q4 += Number(data.oct) + Number(data.nov) + Number(data.decm);
        result.to+=Number(data.jan) + Number(data.feb) + Number(data.mar)+Number(data.apr) + Number(data.may) + Number(data.jun)+Number(data.jul) + Number(data.aug) + Number(data.sep)+Number(data.oct) + Number(data.nov) + Number(data.decm);
        result.un = result.adjusted-result.to;
        result.fu = result.to/result.adjusted;
        /*
        if (typeof data.silver === "number") {
          result.silver += data.silver;
          result.silverPie += data.silver * Math.PI;
        }
        if (typeof data.bronze === "number") {
          result.bronze += data.bronze;
          result.bronzePie += data.bronze * Math.PI;
        }*/
      });
      return result;
    };
  }
}
