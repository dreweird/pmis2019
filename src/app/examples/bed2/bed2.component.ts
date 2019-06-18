import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { MfoService } from '../services/mfo.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { logDialog } from './logDialog.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'anms-bed2',
  templateUrl: './bed2.component.html',
  styleUrls: ['./bed2.component.css']
})
export class Bed2Component implements OnInit, OnChanges {
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
  date_updated: any;
  logs: any;
  user: any;
  edit:any;
  excelStyles: any;
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  mon = ["jan", "feb", "mar","q1", "apr", "may", "jun" ,"q2" , "jul", "aug", "sep" ,"q3", "oct", "nov", "dec" ,"q4","t"];


ngOnChanges(changes:any) {
    console.log(changes.pid.currentValue);
    this.mfoService.getMFOPhysical(changes.pid.currentValue).subscribe(data => {
      this.rowData = data;
      console.log(data);
    });
    this.mfoService.getLastUpdated(2, changes.pid.currentValue).subscribe(data => {
    this.date_updated = data;
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.mfoService.getMFOPhysical(this.user.pid).subscribe(data => {
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
  updateLogs(id: number, value: number, col: string, month: string, beds: number) {
    const uid = JSON.parse(localStorage.getItem('currentUser'));
    const mo = month.slice(0, -1);
    this.mfoService
      .updateLogs(id, value, uid.pid, col, month, beds,null,null,null)
      .subscribe(data => console.log(data));
    this.lastUpdated();
  }

  getLogs(){
    if(this.pid === 0) {
      this.pid = this.user.pid
    }
    this.dialog.open(logDialog,{data: {
      beds: 2, pid: this.pid
    }});
  }

  exportcsv(){
    var ck=["mfo_name","unitmeasure","taccomp"];
    for(var i=1;i<=3;i++){
      for(var ii=0;ii<this.mon.length;ii++){
        var add="";
        if(i==1){ add="t"; }
        else if(i==2){ add="a";}
        else add="r";
        if((i==3&&ii==3)||(i==3&&ii==7)||(i==3&&ii==11)||(i==3&&ii==15)||(i==3&&ii==16)){}
        else{ ck.push(this.mon[ii]+add); if(i==2&&ii==this.mon.length-1){ ck.push("var","perc")} }
      }
    }
    console.log(ck);
    var prog_ou=this.user.username;
    if(this.pid!=0) prog_ou=this.name+" - M&E Generated";
    if(prog_ou.substring(0, 7)=="budget_") prog_ou  = prog_ou.substring(7, prog_ou.length+1);
    //ck.push("q1r","q2r","q3r","q4r")
    this.gridApi.exportDataAsExcel({
      customHeader  : [
        [{styleId:'headappend',data:{type:'String', value:'DEPARTMENT OF AGRICULTURE'}}],
        [{styleId:'headappend',data:{type:'String', value:'Regional Field Office XIII'}}],
        [{styleId:'headappend',data:{type:'String', value:'BED2 Report 2019'}}],
        [{styleId:'headappend',data:{type:'String', value: prog_ou.toUpperCase()}}],
        [{styleId:'headappend',data:{type:'String', value:'C.Y. 2019 CURRENT APPROPRIATION'}}],
        [{styleId:'headappend',data:{type:'String', value: 'PMIS v4.0 Generated as of '+this.months[new Date().getMonth()]+' '+new Date().getDate()+', '+new Date().getFullYear()
        }}],
        [],
        [ {data: {type:'String', value:''}},
          {data: {type:'String', value:''}},
          {styleId:'p1',data:{type:'String', value:'Physical Targets'},mergeAcross:16},
          {styleId:'p2',data:{type:'String', value:'Physical Accomplishments'},mergeAcross:16},
          {styleId:'p1',data:{type:'String', value:''}},
          {styleId:'p1',data:{type:'String', value:''}},
          {styleId:'p2',data:{type:'String', value:'Remarks'},mergeAcross:11},
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
        console.log(params);
        if(node.group && params.column.colDef.field=="mfo_name") return node.key;
        else if(params.column.colDef.headerName=="Total Cost" && isNaN(params.value))return '';
        else return params.value;
      },
    });
  }

  onCellValueChanged(event: any) {
    console.log(event);
    if (isNaN(+event.newValue)&& event.colDef.cellEditor!="agLargeTextCellEditor") {
      console.log('ok');
      event.node.setDataValue(event.colDef.field,event.oldValue);
      var mes="Error: Invalid entry. Please input numbers only.";
      this.snackBar.open(mes, null, { duration: 3000, panelClass: 'error-notification-overlay'});
   
   } else{
     console.log('ok2');
      this.updateLogs(event.data.mfo_id, event.newValue, event.data.mfo_name, event.colDef.field, 2);
      this.mfoService
        .updatePhysical(event.data.mfo_id, event.newValue, event.colDef.field)
        .subscribe(data => {
          console.log(data);
        });

         
    }
  }

  constructor(private mfoService: MfoService, public dialog: MatDialog,private snackBar: MatSnackBar) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.edit = this.user.b==0 && this.user.pid!=100;
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
      { cellClass:['data'],headerName: 'Unit Measure', field: 'unitmeasure', width: 100 },
      {
        headerName: 'Physical Targets',
        children: [
          {
            cellClass:['data'],headerName: 'Jan',
            field: 'jant',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            cellClass:['data'],headerName: 'Feb',
            field: 'febt',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            cellClass:['data'],headerName: 'Mar',
            field: 'mart',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            cellClass:['data','t'],headerName: 'Q1',
            field: 'q1t',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#b23c9a' },
            valueGetter:
              'Number(data.jant) + Number(data.febt) + Number(data.mart)',
            type: 'valueColumn'
          },
          {
            cellClass:['data'],headerName: 'Apr',
            field: 'aprt',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            cellClass:['data'],headerName: 'May',
            field: 'mayt',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            cellClass:['data'],headerName: 'Jun',
            field: 'junt',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            cellClass:['data','t'],headerName: 'Q2',
            field: 'q2t',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#b23c9a' },
            valueGetter:
              'Number(data.aprt) + Number(data.mayt) + Number(data.junt)',
            type: 'valueColumn'
          },
          {
            cellClass:['data'],headerName: 'Jul',
            field: 'jult',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            cellClass:['data'],headerName: 'Aug',
            field: 'augt',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            cellClass:['data'],headerName: 'Sep',
            field: 'sept',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            cellClass:['data','t'],headerName: 'Q3',
            field: 'q3t',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#b23c9a' },
            valueGetter:
              'Number(data.jult) + Number(data.augt) + Number(data.sept)',
            type: 'valueColumn'
          },
          {
            cellClass:['data'],headerName: 'Oct',
            field: 'octt',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            cellClass:['data'],headerName: 'Nov',
            field: 'novt',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            cellClass:['data'],headerName: 'Dec',
            field: 'dect',
            width: 70,
            columnGroupShow: 'open',
            type: 'valueColumn'
          },
          {
            cellClass:['data','t'],headerName: 'Q4',
            field: 'q4t',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#b23c9a' },
            valueGetter:
              'Number(data.octt) + Number(data.novt) + Number(data.dect)',
            type: 'valueColumn'
          },
          {
            cellClass:['data','a'],headerName: 'TOTAL',
            field: 'tt',
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
            cellClass:['data'],headerName: 'Jan',
            field: 'jana',
            width: 70,
            editable: this.edit,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            cellClass:['data'],headerName: 'Feb',
            field: 'feba',
            width: 70,
            editable: this.edit,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            cellClass:['data'],headerName: 'Mar',
            field: 'mara',
            width: 70,
            editable: this.edit,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            cellClass:['data','d1'],headerName: 'Q1',
            field: 'q1a',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            valueGetter:
              'Number(data.jana) + Number(data.feba) + Number(data.mara)',
            type: 'totalColumn'
          },
          {
            cellClass:['data'],headerName: 'Apr',
            field: 'apra',
            width: 70,
            editable: this.edit,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            cellClass:['data'],headerName: 'May',
            field: 'maya',
            width: 70,
            editable: this.edit,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            cellClass:['data'],headerName: 'Jun',
            field: 'juna',
            width: 70,
            editable: this.edit,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            cellClass:['data','d1'],headerName: 'Q2',
            field: 'q2a',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            valueGetter:
              'Number(data.apra) + Number(data.maya) + Number(data.juna)',
            type: 'totalColumn'
          },
          {
            cellClass:['data'],headerName: 'Jul',
            field: 'jula',
            width: 70,
            editable: this.edit,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            cellClass:['data'],headerName: 'Aug',
            field: 'auga',
            width: 70,
            editable: this.edit,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            cellClass:['data'],headerName: 'Sep',
            field: 'sepa',
            width: 70,
            editable: this.edit,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            cellClass:['data','d1'],headerName: 'Q3',
            field: 'q3a',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            valueGetter:
              'Number(data.jula) + Number(data.auga) + Number(data.sepa)',
            type: 'totalColumn'
          },
          {
            cellClass:['data'],headerName: 'Oct',
            field: 'octa',
            width: 70,
            editable: this.edit,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            cellClass:['data'],headerName: 'Nov',
            field: 'nova',
            width: 70,
            editable: this.edit,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            cellClass:['data'],headerName: 'Dec',
            field: 'deca',
            width: 70,
            editable: this.edit,
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            cellClass:['data','d1'],headerName: 'Q4',
            field: 'q4a',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#5472d3' },
            valueGetter:
              'Number(data.octa) + Number(data.nova) + Number(data.deca)',
            type: 'totalColumn'
          },
          {
            cellClass:['data','d2'],headerName: 'TOTAL',
            field: 'ta',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#ef7109' },
            type: 'totalColumn',
            valueGetter:
              'Number(data.jana) + Number(data.feba) + Number(data.mara) + Number(data.apra) + Number(data.maya) + Number(data.juna) + Number(data.jula) + Number(data.auga) + Number(data.sepa) + Number(data.octa) + Number(data.nova) + Number(data.deca)'
          }
        ]
      },

      {
        cellClass:['data'],headerName: 'Variance',
        field: 'var',
        width: 70,
        type: 'totalColumn',
        valueGetter:
          '(Number(data.jana) + Number(data.feba) + Number(data.mara) + Number(data.apra) + Number(data.maya) + Number(data.juna) + Number(data.jula) + Number(data.auga) + Number(data.sepa) + Number(data.octa) + Number(data.nova) + Number(data.deca)) - (Number(data.jant) + Number(data.febt) + Number(data.mart) + Number(data.aprt) + Number(data.mayt) + Number(data.junt) + Number(data.jult) + Number(data.augt) + Number(data.sept) + Number(data.octt) + Number(data.novt) + Number(data.dect))',
        cellStyle: { color: 'white', 'background-color': '#e83525' }
      },
      {
        cellClass:['data'],headerName: 'Percentage',
        field: 'perc',
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
            cellClass:['data'],headerName: 'Jan',
            field: 'janr',
            width: 100,
            editable: this.edit,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          },
          {
            cellClass:['data'],headerName: 'Feb',
            field: 'febr',
            width: 100,
            editable: this.edit,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          },
          {
            cellClass:['data'],headerName: 'Mar',
            field: 'marr',
            width: 100,
            editable: this.edit,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          },
          {
            cellClass:['data'],headerName: 'Apr',
            field: 'aprr',
            width: 100,
            editable: this.edit,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          },
          {
            cellClass:['data'],headerName: 'May',
            field: 'mayr',
            width: 100,
            editable: this.edit,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          },
          {
            cellClass:['data'],headerName: 'Jun',
            field: 'junr',
            width: 100,
            editable: this.edit,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          },
          {
            cellClass:['data'],headerName: 'Jul',
            field: 'julr',
            width: 100,
            editable: this.edit,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          },
          {
            cellClass:['data'],headerName: 'Aug',
            field: 'augr',
            width: 100,
            editable: this.edit,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          },
          {
            cellClass:['data'],headerName: 'Sep',
            field: 'sepr',
            width: 100,
            editable: this.edit,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          },
          {
            cellClass:['data'],headerName: 'Oct',
            field: 'octr',
            width: 100,
            editable: this.edit,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          },
          {
            cellClass:['data'],headerName: 'Nov',
            field: 'novr',
            width: 100,
            editable: this.edit,
            cellEditor: 'agLargeTextCellEditor',
            maxLength: 500,
            cols: 40,
            rows: 5
          },
          {
            cellClass:['data'],headerName: 'Dec',
            field: 'decr',
            width: 100,
            editable: this.edit,
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
    this.mfoService.getLastUpdated(2, this.user.pid).subscribe(data => {
      this.date_updated = data;
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
