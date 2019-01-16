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
  date_updated: any;

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.mfoService.getMFOPhysical().subscribe(data => {
      this.rowData = data;
      console.log(data);
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
  updateLogs(id: number, value: number, col: string) {
    const uid = JSON.parse(localStorage.getItem('currentUser'));
    this.mfoService
      .updateLogs(id, value, uid.user_id, col)
      .subscribe(data => console.log(data));
    this.lastUpdated();
  }

  onCellValueChanged(event: any) {
    if (isNaN(+event.newValue)) {
      alert('Invalid entry...input numbers only');
      event.newValue = null;
    } else {
      this.updateLogs(event.data.mfo_id, event.newValue, event.data.mfo_name);
      this.mfoService
        .updatePhysical(event.data.mfo_id, event.newValue, event.colDef.field)
        .subscribe(data => {
          console.log(data);
        });
    }
  }

  constructor(private mfoService: MfoService) {
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
      { headerName: 'Unit Measure', field: 'unitmeasure', width: 100 },
      {
        headerName: 'Physical Targets',
        children: [
          {
            headerName: 'Jan',
            field: 'jant',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            headerName: 'Feb',
            field: 'febt',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            headerName: 'Mar',
            field: 'mart',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            headerName: 'Q1',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#b23c9a' },
            valueGetter:
              'Number(data.jant) + Number(data.febt) + Number(data.mart)',
            type: 'valueColumn'
          },
          {
            headerName: 'Apr',
            field: 'aprt',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            headerName: 'May',
            field: 'mayt',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            headerName: 'Jun',
            field: 'junt',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            headerName: 'Q2',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#b23c9a' },
            valueGetter:
              'Number(data.aprt) + Number(data.mayt) + Number(data.junt)',
            type: 'valueColumn'
          },
          {
            headerName: 'Jul',
            field: 'jult',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            headerName: 'Aug',
            field: 'augt',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            headerName: 'Sep',
            field: 'sept',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            headerName: 'Q3',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#b23c9a' },
            valueGetter:
              'Number(data.jult) + Number(data.augt) + Number(data.sept)',
            type: 'valueColumn'
          },
          {
            headerName: 'Oct',
            field: 'octt',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            headerName: 'Nov',
            field: 'novt',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            headerName: 'Dec',
            field: 'dect',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            headerName: 'Q4',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#b23c9a' },
            valueGetter:
              'Number(data.octt) + Number(data.novt) + Number(data.dect)',
            type: 'valueColumn'
          },
          {
            headerName: 'TOTAL',
            width: 70,
            columnGroupShow: 'closed',
            cellStyle: { color: 'white', 'background-color': '#ef7109' },
            valueGetter:
              'Number(data.jant) + Number(data.febt) + Number(data.mart) + Number(data.aprt) + Number(data.mayt) + Number(data.junt) + Number(data.jult) + Number(data.augt) + Number(data.sept) + Number(data.octt) + Number(data.novt) + Number(data.dect)',
            type: 'totalColumn'
          }
        ]
      },
      {
        headerName: 'Physical Accomplishments',
        children: [
          {
            headerName: 'Jan',
            field: 'jana',
            width: 70,
            editable: true,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Feb',
            field: 'feba',
            width: 70,
            editable: true,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Mar',
            field: 'mara',
            width: 70,
            editable: true,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Q1',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            valueGetter:
              'Number(data.jana) + Number(data.feba) + Number(data.mara)',
            type: 'totalColumn'
          },
          {
            headerName: 'Apr',
            field: 'apra',
            width: 70,
            editable: true,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'May',
            field: 'maya',
            width: 70,
            editable: true,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Jun',
            field: 'juna',
            width: 70,
            editable: true,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Q2',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            valueGetter:
              'Number(data.apra) + Number(data.maya) + Number(data.juna)',
            type: 'totalColumn'
          },
          {
            headerName: 'Jul',
            field: 'jula',
            width: 70,
            editable: true,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Aug',
            field: 'auga',
            width: 70,
            editable: true,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Sep',
            field: 'sepa',
            width: 70,
            editable: true,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Q3',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            valueGetter:
              'Number(data.jula) + Number(data.auga) + Number(data.sepa)',
            type: 'totalColumn'
          },
          {
            headerName: 'Oct',
            field: 'octa',
            width: 70,
            editable: true,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Nov',
            field: 'nova',
            width: 70,
            editable: true,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Dec',
            field: 'deca',
            width: 70,
            editable: true,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Q4',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            valueGetter:
              'Number(data.octa) + Number(data.nova) + Number(data.deca)',
            type: 'totalColumn'
          },
          {
            headerName: 'TOTAL',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#ef7109' },
            type: 'totalColumn',
            valueGetter:
              'Number(data.jana) + Number(data.feba) + Number(data.mara) + Number(data.apra) + Number(data.maya) + Number(data.juna) + Number(data.jula) + Number(data.auga) + Number(data.sepa) + Number(data.octa) + Number(data.nova) + Number(data.deca)'
          }
        ]
      },

      {
        headerName: 'Variance',
        width: 70,
        type: 'totalColumn',
        valueGetter:
          '(Number(data.jana) + Number(data.feba) + Number(data.mara) + Number(data.apra) + Number(data.maya) + Number(data.juna) + Number(data.jula) + Number(data.auga) + Number(data.sepa) + Number(data.octa) + Number(data.nova) + Number(data.deca)) - (Number(data.jant) + Number(data.febt) + Number(data.mart) + Number(data.aprt) + Number(data.mayt) + Number(data.junt) + Number(data.jult) + Number(data.augt) + Number(data.sept) + Number(data.octt) + Number(data.novt) + Number(data.dect))',
        cellStyle: { color: 'white', 'background-color': '#e83525' }
      },
      {
        headerName: 'Percentage',
        width: 70,
        valueFormatter: this.percentageFormatter,
        aggFunc: 'avg',
        valueGetter:
          '(Number(data.jana) + Number(data.feba) + Number(data.mara) + Number(data.apra) + Number(data.maya) + Number(data.juna) + Number(data.jula) + Number(data.auga) + Number(data.sepa) + Number(data.octa) + Number(data.nova) + Number(data.deca)) / (Number(data.jant) + Number(data.febt) + Number(data.mart) + Number(data.aprt) + Number(data.mayt) + Number(data.junt) + Number(data.jult) + Number(data.augt) + Number(data.sept) + Number(data.octt) + Number(data.novt) + Number(data.dect))',
        cellStyle: { color: 'white', 'background-color': '#4b830d' }
      },
      {
        headerName: 'Remarks',
        children: [
          {
            headerName: 'Jan',
            field: 'janr',
            width: 100,
            editable: true,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          },
          {
            headerName: 'Feb',
            field: 'febr',
            width: 100,
            editable: true,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          },
          {
            headerName: 'Mar',
            field: 'marr',
            width: 100,
            editable: true,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          },
          {
            headerName: 'Apr',
            field: 'aprr',
            width: 100,
            editable: true,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          },
          {
            headerName: 'May',
            field: 'mayr',
            width: 100,
            editable: true,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          },
          {
            headerName: 'Jun',
            field: 'junr',
            width: 100,
            editable: true,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          },
          {
            headerName: 'Jul',
            field: 'julr',
            width: 100,
            editable: true,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          },
          {
            headerName: 'Aug',
            field: 'augr',
            width: 100,
            editable: true,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          },
          {
            headerName: 'Sep',
            field: 'sepr',
            width: 100,
            editable: true,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          },
          {
            headerName: 'Oct',
            field: 'octr',
            width: 100,
            editable: true,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          },
          {
            headerName: 'Nov',
            field: 'novr',
            width: 100,
            editable: true,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          },
          {
            headerName: 'Dec',
            field: 'decr',
            width: 100,
            editable: true,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          }
        ]
      }
    ];

    this.columnTypes = {
      valueColumn: {
        width: 100,
        aggFunc: 'sum',
        valueParser: 'Number(newValue)',
        cellClass: 'number-cell'
      },
      totalColumn: {
        aggFunc: 'sum',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellClass: 'number-cell'
      }
    };
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

    this.components = { simpleCellRenderer: getSimpleCellRenderer() };
  }

  lastUpdated() {
    this.mfoService.getLastUpdated().subscribe(data => {
      this.date_updated = data[0].date;
    });
  }

  ngOnInit() {
    this.lastUpdated();
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
