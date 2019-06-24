import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { MfoService } from '../services/mfo.service';
import { MatDialog } from '@angular/material';
import { logDialog } from '../bed2/logDialog.component';
import { MatSnackBar } from '@angular/material';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'anms-bed3',
  templateUrl: './bed3.component.html',
  styleUrls: ['./bed3.component.css']
})
export class Bed3Component implements OnInit, OnChanges {
  @Input() pid: number = 0;
  @Input() name: string = '';
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  gridApi: any;
  gridColumnApi: any;
  rowData: any;
  columnDefs: any;
  autoGroupColumnDef: any;
  components: any;
  rowSelection: any;
  columnTypes: any;
  groupRowAggNodes;
  date_updated: any;
  logs: any;
  user: any;
  edit:any;
  excelStyles:any;
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  mon = ["jan", "feb", "mar","Q1", "apr", "may", "jun" ,"Q2" , "jul", "aug", "sep" ,"Q3", "oct", "nov", "dec" ,"Q4","to"];

  ngOnChanges(changes:any) {
    console.log(changes.pid.currentValue);
    this.mfoService.getMFO(changes.pid.currentValue).subscribe(data => {
      this.rowData = data;
      console.log(data);
    });
    this.mfoService.getLastUpdated(3, changes.pid.currentValue).subscribe(data => {
    this.date_updated = data;
    });
  }

  exportcsv(){
    var ck=["mfo_name","name","object_id","budget","adjustment","adjusted"];
    for(var i=1;i<=3;i++){
      for(var ii=0;ii<this.mon.length;ii++){
        var add="";
        if(i==1){ add=""; }
        if(i==3){ add="_da"; }
        if(i==2){ add="_dt"; }
        //if(i==2&&ii==14) add="m";
        ck.push(this.mon[ii]+add);
        if(i==1&&ii==this.mon.length-1)ck.push("un","fu");
      }
    }
    ck.push("unpaid_obligation","disbursement_utilization");
    var prog_ou=this.user.username;
    console.log(ck);
    if(this.pid!=0) prog_ou=this.name+" - M&E Generated";
    if(prog_ou.substring(0, 7)=="budget_") prog_ou  = prog_ou.substring(7, prog_ou.length+1);
    this.gridApi.exportDataAsExcel({
      customHeader  : [
        [{styleId:'headappend',data:{type:'String', value:'DEPARTMENT OF AGRICULTURE'}}],
        [{styleId:'headappend',data:{type:'String', value:'Regional Field Office XIII'}}],
        [{styleId:'headappend',data:{type:'String', value:'BED3 Report 2019'}}],
        [{styleId:'headappend',data:{type:'String', value:prog_ou.toUpperCase()}}],
        [{styleId:'headappend',data:{type:'String', value:'C.Y. 2019 CURRENT APPROPRIATION'}}],
        [{styleId:'headappend',data:{type:'String', value: 'PMIS v4.0 Generated as of '+this.months[new Date().getMonth()]+' '+new Date().getDate()+', '+new Date().getFullYear()
        }}],
        [],
        [ {data: {type:'String', value:''}},
          {data: {type:'String', value:''}},
          {data: {type:'String', value:''}},
          {data: {type:'String', value:''}},
          {data: {type:'String', value:''}},
          {data: {type:'String', value:''}},
          {styleId:'d2',data:{type:'String', value:'Financial Obligation'},mergeAcross:17},
          {styleId:'a',data:{type:'String', value:'Financial Accomplishments'},mergeAcross:16},
          {styleId:'p2',data:{type:'String', value:'Financial Disbursement'},mergeAcross:16},
          {styleId:'ad',data:{type:'String', value:''}},
          {styleId:'',data:{type:'String', value:''}},
        ],
      ],
      columnKeys:ck,
      processHeaderCallback: function(params){
        var name = params.column.colDef.headerName;
        //console.log(params);
        //if(params.column.visible)
        if( name == "mfo_name") {return "PAP";}
        else if(name =="header_program"||name =="header_mfo"||name =="header_indicator"||name =="mfo_id"){} // do nothing
        else {return params.column.colDef.headerName;}
      },
      shouldRowBeSkipped:function(params){
        //console.log(params);
        return params.node.group && params.node.childrenAfterGroup.length==1;
      },
      processCellCallback:function (params){
        var node = params.node;
        //console.log(params);
        if(params.column.colDef.field=="mfo_name"){
          if(node.group) {
            return node.key;
          }else {
            return params.value;
          }
        }
        else if(params.column.colDef.field=="fu" && isNaN(params.value))return '';
        else return params.value;
      },
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.mfoService.getMFO(this.user.pid).subscribe(data => {
      this.rowData = data;
      console.log(data);
    });
  }

  updateLogs(id: number, value: number, col: string, month: string, beds: number) {
   // const uid = JSON.parse(localStorage.getItem('currentUser'));
    this.mfoService
      .updateLogs(id, value, this.pid, col, month, beds,null,null,null)
      .subscribe(data => console.log(data));
    this.lastUpdated();
  }

  getLogs(){
    if(this.pid === 0) {
      this.pid = this.user.pid
    }
    this.dialog.open(logDialog,{data: {
      beds: 3, pid: this.pid
    }});
  }

  lastUpdated() {
    this.mfoService.getLastUpdated(3, this.pid).subscribe(data => {
      this.date_updated = data;
    });
  }

  onCellValueChanged(event: any) {
    console.log(event);
    if (isNaN(+event.newValue)&& event.colDef.cellEditor!="agLargeTextCellEditor") {
      event.node.setDataValue(event.colDef.field,event.oldValue);
      var mes="Error: Invalid entry. Please input numbers only.";
      this.snackBar.open(mes, null, { duration: 3000, panelClass: 'error-notification-overlay'});
    } else {
      this.updateLogs(event.data.mfo_id, event.newValue, event.data.mfo_name, event.colDef.field, 3);
      this.mfoService
        .updateAllotment(event.data.id, event.newValue, event.colDef.field)
        .subscribe(data => {
          console.log(data);
        });      
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

  constructor(private mfoService: MfoService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.edit = this.user.b==2;
    this.excelStyles= [
      { id:"indent1",alignment :{indent:1} },
      { id:"indent2",alignment :{indent:2} },
      { id:"indent3",alignment :{indent:3} },
      { id:"indent4",alignment :{indent:4} },
      { id:"indent5",alignment :{indent:5} },
      { id:"bold", font: {bold:true} },
      {
        id: "data",
        font: { size:11, fontName: "Calibri", },
        borders: {
          borderBottom: { color: "#000000", lineStyle: "Continuous", weight: 1 },
          borderLeft: { color: "#000000", lineStyle: "Continuous", weight: 1 },
          borderRight: { color: "#000000", lineStyle: "Continuous", weight: 1 },
          borderTop: { color: "#000000", lineStyle: "Continuous", weight: 1 },
        }
      },
      { id: "ad", interior: { color: "#f1cbff", pattern: 'Solid' }, font: { size:11, fontName: "Calibri", bold: true }, },
      { id: "un", interior: { color: "#ffbdbd", pattern: 'Solid' }, font: { size:11, fontName: "Calibri", bold: true }, },
      { id: "p1", interior: { color: "#BBDAFF", pattern: 'Solid' }, font: { size:11, fontName: "Calibri", bold: true }, alignment:{horizontal:'Center'}},
      { id: "p2", interior: { color: "#86BCFF", pattern: 'Solid' }, font: { size:11, fontName: "Calibri", bold: true }, alignment:{horizontal:'Center'}},
      { id: "t", interior: { color: "#fddfdf", pattern: 'Solid' }, font: { size:11, fontName: "Calibri", bold: true }, alignment:{horizontal:'Center'}},
      { id: "a", interior: { color: "#ffb7b2", pattern: 'Solid' }, font: { size:11, fontName: "Calibri", bold: true }, alignment:{horizontal:'Center'}},
      { id: "d1", interior: { color: "#92FEF9", pattern: 'Solid' }, font: { size:11, fontName: "Calibri", bold: true }, alignment:{horizontal:'Center'}},
      { id: "d2", interior: { color: "#01FCEF", pattern: 'Solid' }, font: { size:11, fontName: "Calibri", bold: true }, alignment:{horizontal:'Center'}},
      {
        id: "header",
        font: { size:11, fontName: "Calibri", bold: true, },
        borders: {
          borderBottom: { color: "#000000", lineStyle: "Continuous", weight: 1 },
          borderLeft: { color: "#000000", lineStyle: "Continuous", weight: 1 },
          borderRight: { color: "#000000", lineStyle: "Continuous", weight: 1 },
          borderTop: { color: "#000000", lineStyle: "Continuous", weight: 1 },
        }
      },
      { id: "headappend", font: { size:11, fontName: "Calibri", bold: true, }, }
    ];
    this.rowSelection = 'single';
    this.columnDefs = [
      {headerName: 'header_main', field: 'header_main', width: 120, rowGroup: true, hide: true },
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
      {
        headerName: 'mfo_name',
        field: 'mfo_name',
        width: 120,
        rowGroup: true,
        hide: true,
        cellClass:['data'],
        cellClassRules:{
          indent1: function(params){
            if(params.node.uiLevel==1) return true;
          },
          indent2: function(params){
            if(params.node.uiLevel==2) return true;
          },
          indent3: function(params){
            if(params.node.uiLevel==3) return true;
          },
          indent4: function(params){
            if(params.node.uiLevel==4) return true;
          },
          indent5: function(params){
            if(params.node.uiLevel==5) return true;
          },
          bold: function(params){
            if(params.node.group) return true;
          }
        }
      },
      { cellClass:['data'],headerName: 'Description', field: 'name', width: 150, pinned: 'left' },
      { cellClass:['data'],headerName: 'UACS Object Code', field: 'object_id', width: 100  },
      { cellClass:['data'],headerName: "Allotment",
        children: [
          {
            cellClass:['data'],headerName: 'Original Allotment', columnGroupShow: "open", 
            field: 'budget',
            width: 100,
            aggFunc: 'sum',
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn'
          },
          {
            cellClass:['data'],headerName: 'Adjustment', columnGroupShow: "open", 
            field: 'adjustment',
            width: 100,
            aggFunc: 'sum',
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn',
          },
          {
            cellClass:['data','ad'],headerName: 'Adjusted Allotment',
            field: 'adjusted',
            width: 120,
            cellStyle: { color: 'white', 'background-color': '#b23c9a' },
            aggFunc: 'sum',
            valueGetter: 'Number(data.budget) + Number(data.adjustment) ',
            valueFormatter: this.currencyFormatter,
            type: 'valueColumn'
          },
        ]
      },
      { headerName: "Obligation",
        children: [
          { cellClass:['data'],headerName: 'Jan', columnGroupShow: "open", field: 'jan', width: 70, editable: false, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          { cellClass:['data'],headerName: 'Feb', columnGroupShow: "open", field: 'feb', width: 70, editable: false, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          { cellClass:['data'],headerName: 'Mar', columnGroupShow: "open", field: 'mar', width: 70, editable: false, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          {
            cellClass:['data','d1'],headerName: 'Q1', field: 'Q1', width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            valueGetter: 'Number(data.jan) + Number(data.feb) + Number(data.mar)',
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn'
          },
          { cellClass:['data'],headerName: 'Apr', columnGroupShow: "open", field: 'apr', width: 70, editable: false, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          { cellClass:['data'],headerName: 'May', columnGroupShow: "open", field: 'may', width: 70, editable: false, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          { cellClass:['data'],headerName: 'Jun', columnGroupShow: "open", field: 'jun', width: 70, editable: false, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          {
            cellClass:['data','d1'],headerName: 'Q2', field: 'Q2', width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            valueGetter: 'Number(data.apr) + Number(data.may) + Number(data.jun)',
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn'
          },
          { cellClass:['data'],headerName: 'Jul', columnGroupShow: "open", field: 'jul', width: 70, editable: false, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          { cellClass:['data'],headerName: 'Aug', columnGroupShow: "open",  field: 'aug', width: 70, editable: false, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          { cellClass:['data'],headerName: 'Sep', columnGroupShow: "open",  field: 'sep', width: 70, editable: false, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          {
            cellClass:['data','d1'],headerName: 'Q3', field: 'Q3', width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            valueGetter: 'Number(data.jul) + Number(data.aug) + Number(data.sep)',
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn'
          },
          { cellClass:['data'],headerName: 'Oct', columnGroupShow: "open",  field: 'oct', width: 70, editable: false, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          { cellClass:['data'],headerName: 'Nov', columnGroupShow: "open", field: 'nov', width: 70, editable: false, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          { cellClass:['data'],headerName: 'Dec', columnGroupShow: "open", field: 'decm', width: 70, editable: false, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          {
            cellClass:['data','d1'],headerName: 'Q4', field: 'Q4', width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            valueGetter: 'Number(data.oct) + Number(data.nov) + Number(data.decm)',
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn'
          },
          {
            cellClass:['data','d2'],headerName: 'Total Obligations',
            field: 'to',
            width: 120,
            cellStyle: { color: 'white', 'background-color': '#ef7109' },
            valueGetter:
              'Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.decm)',
            valueFormatter: this.currencyFormatter,
            type: 'totalColumn'
          },
          {
            cellClass:['data','ad'],headerName: 'Unobligated', columnGroupShow: "open", 
            field: 'un',
            width: 120,
            cellStyle: { color: 'white', 'background-color': '#e83525' },
            valueGetter:
              '(Number(data.budget) + Number(data.adjustment)) - (Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.decm))',
            valueFormatter: this.currencyFormatter,
            type: 'totalColumn'
          },
          {
            cellClass:['data'],headerName: '% Utilization', columnGroupShow: "open", 
            field: 'fu',
            width: 70,
            cellStyle: { color: 'black', 'background-color': 'yellow' },
            valueGetter:
              '(Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.decm)) / (Number(data.budget) + Number(data.adjustment))',
            valueFormatter: this.percentageFormatter,
            type: 'totalColumn'
          }
        ]
      },
    
      { headerName: "Disbursement Accomplishment",
        children: [
          { cellClass:['data'],headerName: 'Jan', columnGroupShow: "open", field: 'jan_da', width: 70, editable: this.edit, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          { cellClass:['data'],headerName: 'Feb', columnGroupShow: "open", field: 'feb_da', width: 70, editable: this.edit, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          { cellClass:['data'],headerName: 'Mar', columnGroupShow: "open", field: 'mar_da', width: 70, editable: this.edit, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          {
            cellClass:['data','p1'],headerName: 'Q1', field: 'Q1_da', width: 70,
            cellStyle: { color: 'white', 'background-color': 'green' },
            valueGetter: 'Number(data.jan_da) + Number(data.feb_da) + Number(data.mar_da)',
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn'
          },
          { cellClass:['data'],headerName: 'Apr', columnGroupShow: "open", field: 'apr_da', width: 70, editable: this.edit, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          { cellClass:['data'],headerName: 'May', columnGroupShow: "open", field: 'may_da', width: 70, editable: this.edit, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          { cellClass:['data'],headerName: 'Jun', columnGroupShow: "open", field: 'jun_da', width: 70, editable: this.edit, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          {
            cellClass:['data','p1'],headerName: 'Q2', field: 'Q2_da', width: 70,
            cellStyle: { color: 'white', 'background-color': 'green' },
            valueGetter: 'Number(data.apr_da) + Number(data.may_da) + Number(data.jun_da)',
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn'
          },
          { cellClass:['data'],headerName: 'Jul', columnGroupShow: "open", field: 'jul_da', width: 70, editable: this.edit, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          { cellClass:['data'],headerName: 'Aug', columnGroupShow: "open",  field: 'aug_da', width: 70, editable: this.edit, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          { cellClass:['data'],headerName: 'Sep', columnGroupShow: "open",  field: 'sep_da', width: 70, editable: this.edit, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          {
            cellClass:['data','p1'],headerName: 'Q3', field: 'Q3_da', width: 70,
            cellStyle: { color: 'white', 'background-color': 'green' },
            valueGetter: 'Number(data.jul_da) + Number(data.aug_da) + Number(data.sep_da)',
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn'
          },
          { cellClass:['data'],headerName: 'Oct', columnGroupShow: "open",  field: 'oct_da', width: 70, editable: this.edit, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          { cellClass:['data'],headerName: 'Nov', columnGroupShow: "open", field: 'nov_da', width: 70, editable: this.edit, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          { cellClass:['data'],headerName: 'Dec', columnGroupShow: "open", field: 'dec_da', width: 70, editable: this.edit, valueFormatter: this.currencyFormatter, type: 'valueColumn', },
          {
            cellClass:['data','p1'],headerName: 'Q4', field: 'Q4_da', width: 70,
            cellStyle: { color: 'white', 'background-color': 'green' },
            valueGetter: 'Number(data.oct_da) + Number(data.nov_da) + Number(data.dec_da)',
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn'
          },
          {
            cellClass:['data','p2'],headerName: 'Total Disbursement',
            field: 'to_da',
            width: 150,
            cellStyle: { color: 'white', 'background-color': '#E75480' },
            valueGetter:
              'Number(data.jan_da) + Number(data.feb_da) + Number(data.mar_da) + Number(data.apr_da) + Number(data.may_da) + Number(data.jun_da) + Number(data.jul_da) + Number(data.aug_da) + Number(data.sep_da) + Number(data.oct_da) + Number(data.nov_da) + Number(data.dec_da)',
            valueFormatter: this.currencyFormatter,
            type: 'totalColumn'
          },
          {
            cellClass:['data','ad'],headerName: 'Unpaid Obligations',  
            field: 'unpaid_obligation',
            width: 150,
            cellStyle: { color: 'white', 'background-color': '#e83525' },
            valueGetter:
              '(Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.decm)) - (Number(data.jan_da) + Number(data.feb_da) + Number(data.mar_da) + Number(data.apr_da) + Number(data.may_da) + Number(data.jun_da) + Number(data.jul_da) + Number(data.aug_da) + Number(data.sep_da) + Number(data.oct_da) + Number(data.nov_da) + Number(data.dec_da))',
            valueFormatter: this.currencyFormatter,
            type: 'totalColumn'
          },
          {
            cellClass:['data'],headerName: '% Utilization',
            field: 'disbursement_utilization',
            width: 70,
            cellStyle: { color: 'black', 'background-color': 'yellow' },
            valueGetter:
              '(Number(data.jan_da) + Number(data.feb_da) + Number(data.mar_da) + Number(data.apr_da) + Number(data.may_da) + Number(data.jun_da) + Number(data.jul_da) + Number(data.aug_da) + Number(data.sep_da) + Number(data.oct_da) + Number(data.nov_da) + Number(data.dec_da))/ (Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.decm)) ',
            valueFormatter: this.percentageFormatter,
            type: 'totalColumn'
          }
        ]
      },
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
    this.groupRowAggNodes = function groupRowAggNodes(nodes) {
      var result = {
        to:0,fu:0,un:0,to_dt:0,to_da:0,
        unpaid_obligation: 0,
        disbursement_utilization: 0,
        adjusted: 0,
        budget:0,
        adjustment:0,
        Q1:0,
        Q2:0,
        Q3:0,
        Q4:0,
        Q1_dt: 0,
        Q2_dt: 0,
        Q3_dt: 0,
        Q4_dt: 0,
        Q1_da: 0,
        Q2_da: 0,
        Q3_da: 0,
        Q4_da: 0,
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
        jan_dt: 0,
        feb_dt: 0,
        mar_dt: 0,
        apr_dt: 0,
        may_dt: 0,
        jun_dt: 0,
        jul_dt: 0,
        aug_dt: 0,
        sep_dt: 0,
        oct_dt: 0,
        nov_dt: 0,
        dec_dt: 0,
        jan_da: 0,
        feb_da: 0,
        mar_da: 0,
        apr_da: 0,
        may_da: 0,
        jun_da: 0,
        jul_da: 0,
        aug_da: 0,
        sep_da: 0,
        oct_da: 0,
        nov_da: 0,
        dec_da: 0
      };
      nodes.forEach(function(node) {
        var data = node.group ? node.aggData : node.data;
        if (typeof data.adjustment === "number") {
          result.adjustment += data.adjustment;
        }
        if (typeof data.budget === "number") {
          result.budget += data.budget;
        }
        if (typeof data.budget === "number"&&typeof data.adjustment === "number") {
          result.adjusted += data.budget+ data.adjustment;
        }
        if (typeof data.jan_dt === 'number') {
          result.jan_dt += data.jan_dt;
        }
        if (typeof data.feb_dt === 'number') {
          result.feb_dt += data.feb_dt;
        }
        if (typeof data.mar_dt === 'number') {
          result.mar_dt += data.mar_dt;
        }
        if (typeof data.apr_dt === 'number') {
          result.apr_dt += data.apr_dt;
        }
        if (typeof data.may_dt === 'number') {
          result.may_dt += data.may_dt;
        }
        if (typeof data.jun_dt === 'number') {
          result.jun_dt += data.jun_dt;
        }
        if (typeof data.jul_dt === 'number') {
          result.jul_dt += data.jul_dt;
        }
        if (typeof data.aug_dt === 'number') {
          result.aug_dt += data.aug_dt;
        }
        if (typeof data.sep_dt === 'number') {
          result.sep_dt += data.sep_dt;
        }
        if (typeof data.oct_dt === 'number') {
          result.oct_dt += data.oct_dt;
        }
        if (typeof data.nov_dt === 'number') {
          result.nov_dt += data.nov_dt;
        }
        if (typeof data.dec_dt === 'number') {
          result.dec_dt += data.dec_dt;
        }


        if (typeof data.jan_da === 'number') {
          result.jan_da += data.jan_da;
        }
        if (typeof data.feb_da === 'number') {
          result.feb_da += data.feb_da;
        }
        if (typeof data.mar_da === 'number') {
          result.mar_da += data.mar_da;
        }
        if (typeof data.apr_da === 'number') {
          result.apr_da += data.apr_da;
        }
        if (typeof data.may_da === 'number') {
          result.may_da += data.may_da;
        }
        if (typeof data.jun_da === 'number') {
          result.jun_da += data.jun_da;
        }
        if (typeof data.jul_da === 'number') {
          result.jul_da += data.jul_da;
        }
        if (typeof data.aug_da === 'number') {
          result.aug_da += data.aug_da;
        }
        if (typeof data.sep_da === 'number') {
          result.sep_da += data.sep_da;
        }
        if (typeof data.oct_da === 'number') {
          result.oct_da += data.oct_da;
        }
        if (typeof data.nov_da === 'number') {
          result.nov_da += data.nov_da;
        }
        if (typeof data.dec_da === 'number') {
          result.dec_da += data.dec_da;
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
        result.Q1_dt += Number(data.jan_dt) + Number(data.feb_dt) + Number(data.mar_dt);
        result.Q2_dt += Number(data.apr_dt) + Number(data.may_dt) + Number(data.jun_dt);
        result.Q3_dt += Number(data.jul_dt) + Number(data.aug_dt) + Number(data.sep_dt);
        result.Q4_dt += Number(data.oct_dt) + Number(data.nov_dt) + Number(data.dec_dt);

        result.Q1_da += Number(data.jan_da) + Number(data.feb_da) + Number(data.mar_da);
        result.Q2_da += Number(data.apr_da) + Number(data.may_da) + Number(data.jun_da);
        result.Q3_da += Number(data.jul_da) + Number(data.aug_da) + Number(data.sep_da);
        result.Q4_da += Number(data.oct_da) + Number(data.nov_da) + Number(data.dec_da);

        result.Q1 += Number(data.jan) + Number(data.feb) + Number(data.mar);
        result.Q2 += Number(data.apr) + Number(data.may) + Number(data.jun);
        result.Q3 += Number(data.jul) + Number(data.aug) + Number(data.sep);
        result.Q4 += Number(data.oct) + Number(data.nov) + Number(data.decm);
        result.to+=Number(data.jan) + Number(data.feb) + Number(data.mar)+Number(data.apr) + Number(data.may) + Number(data.jun)+Number(data.jul) + Number(data.aug) + Number(data.sep)+Number(data.oct) + Number(data.nov) + Number(data.decm);
        result.un = result.adjusted-result.to;
        result.fu = result.to/result.adjusted;
        
        result.to_dt +=
        Number(data.jan_dt) +
        Number(data.feb_dt) +
        Number(data.mar_dt) +
        Number(data.apr_dt) +
        Number(data.may_dt) +
        Number(data.jun_dt) +
        Number(data.jul_dt) +
        Number(data.aug_dt) +
        Number(data.sep_dt) +
        Number(data.oct_dt) +
        Number(data.nov_dt) +
        Number(data.dec_dt);

        result.to_da +=
        Number(data.jan_da) +
        Number(data.feb_da) +
        Number(data.mar_da) +
        Number(data.apr_da) +
        Number(data.may_da) +
        Number(data.jun_da) +
        Number(data.jul_da) +
        Number(data.aug_da) +
        Number(data.sep_da) +
        Number(data.oct_da) +
        Number(data.nov_da) +
        Number(data.dec_da);

        result.unpaid_obligation = result.to - result.to_da;
        result.disbursement_utilization =  result.to_da / result.to;
      });
      return result;
    };
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
