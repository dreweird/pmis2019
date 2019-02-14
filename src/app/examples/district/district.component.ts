import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { MfoService } from '../services/mfo.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
import { districtDetailsDialog } from './districtDetailsDialog.component';
import { logDialog } from '../bed2/logDialog.component';
import { keyframes } from '@angular/animations';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'anms-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit, OnChanges {
  @Input() pid: number = 0;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  user: any;
  gridApi: any;
  gridColumnApi: any;
  rowData: any;
  columnDefs: any;
  autoGroupColumnDef: any;
  components: any;
  rowSelection: any;
  columnTypes: any;
  date_updated:any;
  excelStyles:any;
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 

  ngOnChanges(changes:any) {
    console.log(changes.pid.currentValue);
    this.mfoService.getDistrict(changes.pid.currentValue).subscribe(data => {
      this.rowData = data;
      console.log(data);
    });
    this.mfoService.getLastUpdated(4, changes.pid.currentValue).subscribe(data => {
    this.date_updated = data;
    });
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.mfoService.getDistrict(this.user.pid).subscribe(data => {
      this.rowData = data;
      console.log(data);
    });
  }

  currencyFormatter(params) {
    const number = parseFloat(params.value);
    if (params.value === undefined || params.value === null) {
      return null;
    }else if(isNaN(params.value)){
      return "";
    }
    return number.toLocaleString('en-us', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  exportcsv(){
    var prvnc = ["adn", "ads", "sdn", "sds", "pdi", "bxu"];
    var ck=["mfo_name","unitmeasure","taccomp"];
    for(var i=0;i<prvnc.length;i++){
      for(var ii=1;ii<=2;ii++){
        if(!(ii==2&&i>3)){
          ck.push(prvnc[i]+""+ii+"area");
          ck.push(prvnc[i]+""+ii+"target");
          ck.push(prvnc[i]+""+ii+"cost");
          ck.push(prvnc[i]+""+ii+"totalcost");
          ck.push(prvnc[i]+""+ii+"aarea");
          ck.push(prvnc[i]+""+ii+"aaccomp");
        }
        
      }
    }
    ck.push("q1r","q2r","q3r","q4r")
    var prog_ou=this.user.username;
    if(prog_ou.substring(0, 7)=="budget_") prog_ou  = prog_ou.substring(7, prog_ou.length+1);
    this.gridApi.exportDataAsExcel({
      customHeader  : [
        [{styleId:'headappend',data:{type:'String', value:'DEPARTMENT OF AGRICULTURE'}}],
        [{styleId:'headappend',data:{type:'String', value:'Regional Field Office XIII'}}],
        [{styleId:'headappend',data:{type:'String', value:'By District Report 2019'}}],
        [{styleId:'headappend',data:{type:'String', value:prog_ou.toUpperCase()}}],
        [{styleId:'headappend',data:{type:'String', value:'C.Y. 2019 CURRENT APPROPRIATION'}}],
        [{styleId:'headappend',data:{type:'String', value: 'PMIS v4.0 Generated as of '+this.months[new Date().getMonth()]+' '+new Date().getDate()+', '+new Date().getFullYear()
        }}],
        [],
        [ {data: {type:'String', value:''}},
          {data: {type:'String', value:''}},
          {data: {type:'String', value:''}}, 
          {styleId:'p1',data:{type:'String', value:'Agusan del Norte'},mergeAcross:11},
          {styleId:'p2',data:{type:'String', value:'Agusan del Sur'},mergeAcross:11},
          {styleId:'p1',data:{type:'String', value:'Surigao del Norte'},mergeAcross:11},
          {styleId:'p2',data:{type:'String', value:'Surigao del Sur'},mergeAcross:11},
          {styleId:'p1',data:{type:'String', value:'Province of Dinagat Islands'},mergeAcross:5},
          {styleId:'p2',data:{type:'String', value:'Butuan City'},mergeAcross:5},
          {styleId:'p1',data:{type:'String', value:''},mergeAcross:3},
        ],
        [ {data: {type:'String', value:''}},
          {data: {type:'String', value:''}},
          {data: {type:'String', value:''}}, 
          {styleId:'d1',data:{type:'String', value:'District 1'},mergeAcross:5},
          {styleId:'d2',data:{type:'String', value:'District 2'},mergeAcross:5}, 
          {styleId:'d1',data:{type:'String', value:'District 1'},mergeAcross:5},
          {styleId:'d2',data:{type:'String', value:'District 2'},mergeAcross:5}, 
          {styleId:'d1',data:{type:'String', value:'District 1'},mergeAcross:5},
          {styleId:'d2',data:{type:'String', value:'District 2'},mergeAcross:5}, 
          {styleId:'d1',data:{type:'String', value:'District 1'},mergeAcross:5},
          {styleId:'d2',data:{type:'String', value:'District 2'},mergeAcross:5}, 
          {styleId:'d1',data:{type:'String', value:'District 1'},mergeAcross:5},
          {styleId:'d2',data:{type:'String', value:''},mergeAcross:5},
          {styleId:'p1',data:{type:'String', value:'Remarks'},mergeAcross:3},
        ],
        [ {data: {type:'String', value:''}},
          {data: {type:'String', value:''}},
          {data: {type:'String', value:''}}, 
          {styleId:'t',data:{type:'String', value:'Target'},mergeAcross:3}, {styleId:'a',data:{type:'String', value:'Accomplishment'},mergeAcross:1},
          {styleId:'t',data:{type:'String', value:'Target'},mergeAcross:3}, {styleId:'a',data:{type:'String', value:'Accomplishment'},mergeAcross:1},
          {styleId:'t',data:{type:'String', value:'Target'},mergeAcross:3}, {styleId:'a',data:{type:'String', value:'Accomplishment'},mergeAcross:1},
          {styleId:'t',data:{type:'String', value:'Target'},mergeAcross:3}, {styleId:'a',data:{type:'String', value:'Accomplishment'},mergeAcross:1},
          {styleId:'t',data:{type:'String', value:'Target'},mergeAcross:3}, {styleId:'a',data:{type:'String', value:'Accomplishment'},mergeAcross:1},
          {styleId:'t',data:{type:'String', value:'Target'},mergeAcross:3}, {styleId:'a',data:{type:'String', value:'Accomplishment'},mergeAcross:1},
          {styleId:'t',data:{type:'String', value:'Target'},mergeAcross:3}, {styleId:'a',data:{type:'String', value:'Accomplishment'},mergeAcross:1},
          {styleId:'t',data:{type:'String', value:'Target'},mergeAcross:3}, {styleId:'a',data:{type:'String', value:'Accomplishment'},mergeAcross:1},
          {styleId:'t',data:{type:'String', value:'Target'},mergeAcross:3}, {styleId:'a',data:{type:'String', value:'Accomplishment'},mergeAcross:1},
          {styleId:'t',data:{type:'String', value:'Target'},mergeAcross:3}, {styleId:'a',data:{type:'String', value:'Accomplishment'},mergeAcross:1},
          {styleId:'p1',data:{type:'String', value:''},mergeAcross:3},
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

  updateLogs(id: number, value: number, col: string, month: string, beds: number,) {
    const uid = JSON.parse(localStorage.getItem('currentUser'));
    // console.log("4 here");
    this.mfoService
      .updateLogs(id, value, uid.user_id, col, month, beds,null,null,null)
      .subscribe(data => console.log(data));
  }

  onCellValueChanged(event){
    if(event.colDef.editable && event.colDef.cellEditor=="agLargeTextCellEditor"){
      console.log(event);
      event.colDef.field[1];
      event.newValue;
      event.data.mfo_id;
      this.updateLogs(event.data.mfo_id, event.newValue, event.data.mfo_name, event.colDef.headerName, 41);
      this.mfoService
        .updatePhysical(event.data.mfo_id, event.newValue, event.colDef.field)
        .subscribe(data => {
          //console.log(data);
        });
        this.lastUpdated();
    }
  }

  getLogs(){
    this.dialog.open(logDialog,{data: {
      beds: 4, pid: this.user.pid
    }});
  }

  lastUpdated() {
    this.mfoService.getLastUpdated(4, this.user.pid).subscribe(data => {
      this.date_updated = data;
    });
  }

  onCellClicked(event){
    if(event.data!=undefined && this.user.b==0){
      console.log(event);
      var province = ["Agusan del Norte", "Agusan del Sur", "Surigao del Norte", "Surigao del Sur", "Province of Dinagat Islands", "Butuan City"];
      var prvnc = ["adn", "ads", "sdn", "sds", "pdi", "bxu"];
      for(var i=0;i<prvnc.length;i++){
        for(var ii=1;ii<=2;ii++){
          if(event.colDef.field==prvnc[i]+ii+"aaccomp"){
            console.log(prvnc[i]);
            console.log(ii);
            var tar = prvnc[i]+ii+"target";
            if(event.data[tar]==undefined){
              var mes="Error: No target in this location.";
              this.snackBar.open(mes, null, { duration: 3000, panelClass: 'error-notification-overlay'});
            }else{
              console.log(event.data.mfo_id);
              var data={};
              data['province'] = province[i];
              data['district'] = ii;
              data['mfo_id'] = event.data.mfo_id;
              data['mfo_name'] = event.data.mfo_name;
              data['prvnc'] = prvnc[i];
              const dialogRef = this.dialog.open(districtDetailsDialog,{disableClose: true,data:data});

              dialogRef.afterClosed().subscribe(result=>{
                console.log(prvnc[i]+ii+"aarea");
                event.node.setDataValue(result.prvnc+result.district+"aarea",result.str);
                if(result.total>0)
                  event.node.setDataValue(result.prvnc+result.district+"aaccomp",result.total);
                else event.node.setDataValue(result.prvnc+result.district+"aaccomp","");

                this.lastUpdated();
              });
            }
            break;
          }
        }
      }
    }
  }

  constructor(private mfoService: MfoService, public dialog: MatDialog,private snackBar: MatSnackBar) { 
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
    this.user = JSON.parse(localStorage.getItem('currentUser'));
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
        hide: true
      },
      {
        headerName: 'mfo_name',
        field: 'mfo_name',
        width: 120,                                                                                                                                                                                  
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
      { headerName: 'Unit Measure', field: 'unitmeasure', width: 100 ,cellClass: ['data']},
      { headerName: 'Accomplished', field: 'taccomp', width: 100, hide:false,cellClass:['data'],
        valueGetter:
        `Number(data.jana) + Number(data.feba) + Number(data.mara) + Number(data.apra) + 
         Number(data.maya) + Number(data.juna) + Number(data.jula) + Number(data.auga) + 
         Number(data.sepa) + Number(data.octa) + Number(data.nova) + Number(data.deca)`,
         type: 'valueColumn',
        cellStyle: { color: 'white', 'background-color': '#b23c9a' },
        
      },
      { headerName: 'Agusan del Norte', 
        children:[
          { headerName: 'District 1',
            children:[   
              { headerName: 'Target', 
                children:[
                  { cellClass:['data'],headerName: 'Area', field: 'dist.0.one.text', width: 100,columnGroupShow: 'open', },            
                  { cellClass:['data'],headerName: 'Number', field: 'dist.0.one.target', width: 100, type: 'valueColumn',},      
                  { cellClass:['data'],headerName: 'Unit Cost', field: 'dist.0.one.cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter,},      
                  { cellClass:['data'],headerName: 'Total Cost', field: 'adn1totalcost', width: 100,columnGroupShow: 'open', 
                    valueGetter:'Number(data.dist[0].one.target) * Number(data.dist[0].one.cost)', valueFormatter: this.currencyFormatter,
                  },  
                ]
              },
              { headerName: 'Accomplishment', 
                children:[
                  { cellClass:['data'],headerName: 'Area',  field: 'dist.0.one.text2', width: 100, columnGroupShow: 'open',},            
                  { cellClass:['data'],headerName: 'Number', field: 'dist.0.one.accomp', width: 100,  type: 'valueColumn',},
                ]
              }
            ]
          },
          { headerName: 'District 2',
            children:[   
              { headerName: 'Target', 
                children:[
                  { cellClass:['data'],headerName: 'Area', field: 'dist.0.two.text', width: 100,columnGroupShow: 'open', },            
                  { cellClass:['data'],headerName: 'Number', field: 'dist.0.two.target', width: 100,  type: 'valueColumn',},      
                  { cellClass:['data'],headerName: 'Unit Cost', field: 'dist.0.two.cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter, },      
                  { cellClass:['data'],headerName: 'Total Cost', field: 'adn2totalcost', width: 100,columnGroupShow: 'open', 
                    valueGetter:'Number(data.dist[0].two.target) * Number(data.dist[0].two.cost)', valueFormatter: this.currencyFormatter,
                  },  
                ]
              },
              { headerName: 'Accomplishment', 
                children:[
                  { cellClass:['data'],headerName: 'Area', field: 'dist.0.two.text2', width: 100,columnGroupShow: 'open'},          
                  { cellClass:['data'],headerName: 'Number', field: 'dist.0.two.accomp', width: 100,  type: 'valueColumn',},
                ]
              }
            ]
          },
        ]
      },
    //   { headerName: 'Agusan del Sur', 
    //     children:[
    //       { headerName: 'District 1',
    //         children:[   
    //           { headerName: 'Target', 
    //             children:[
    //               { cellClass:['data'],headerName: 'Area', field: 'ads1area', width: 100,columnGroupShow: 'open', },            
    //               { cellClass:['data'],headerName: 'Number', field: 'ads1target', width: 100, type: 'valueColumn',},      
    //               { cellClass:['data'],headerName: 'Unit Cost', field: 'ads1cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter,},      
    //               { cellClass:['data'],headerName: 'Total Cost', field: 'ads1totalcost', width: 100,columnGroupShow: 'open', 
    //                 valueGetter:'Number(data.ads1target) * Number(data.ads1cost)', valueFormatter: this.currencyFormatter,
    //               },  
    //             ]
    //           },
    //           { headerName: 'Accomplishment', 
    //             children:[
    //               { cellClass:['data'],headerName: 'Area', field: 'ads1aarea', width: 100,columnGroupShow: 'open', },            
    //               { cellClass:['data'],headerName: 'Number', field: 'ads1aaccomp', width: 100,  type: 'valueColumn',},
    //             ]
    //           }
    //         ]
    //       },
    //       { headerName: 'District 2',
    //         children:[   
    //           { headerName: 'Target', 
    //             children:[
    //               { cellClass:['data'],headerName: 'Area', field: 'ads2area', width: 100,columnGroupShow: 'open', },            
    //               { cellClass:['data'],headerName: 'Number', field: 'ads2target', width: 100,  type: 'valueColumn',},      
    //               { cellClass:['data'],headerName: 'Unit Cost', field: 'ads2cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter,},      
    //               { cellClass:['data'],headerName: 'Total Cost', field: 'ads2totalcost', width: 100,columnGroupShow: 'open', 
    //                 valueGetter:'Number(data.ads2target) * Number(data.ads2cost)', valueFormatter: this.currencyFormatter,},  
    //             ]
    //           },
    //           { headerName: 'Accomplishment', 
    //             children:[
    //               { cellClass:['data'],headerName: 'Area', field: 'ads2aarea', width: 100,columnGroupShow: 'open', },            
    //               { cellClass:['data'],headerName: 'Number', field: 'ads2aaccomp', width: 100,  type: 'valueColumn',},
    //             ]
    //           }
    //         ]
    //       },
    //     ]
    //   },
    //   { headerName: 'Surigao del Norte', 
    //     children:[
    //       { headerName: 'District 1',
    //         children:[   
    //           { headerName: 'Target', 
    //             children:[
    //               { cellClass:['data'],headerName: 'Area', field: 'sdn1area', width: 100,columnGroupShow: 'open', },            
    //               { cellClass:['data'],headerName: 'Number', field: 'sdn1target', width: 100, type: 'valueColumn',},      
    //               { cellClass:['data'],headerName: 'Unit Cost', field: 'sdn1cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter,},      
    //               { cellClass:['data'],headerName: 'Total Cost', field: 'sdn1totalcost', width: 100,columnGroupShow: 'open', 
    //                 valueGetter:'Number(data.sdn1target) * Number(data.sdn1cost)',valueFormatter: this.currencyFormatter,
    //               },  
    //             ]
    //           },
    //           { headerName: 'Accomplishment', 
    //             children:[
    //               { cellClass:['data'],headerName: 'Area', field: 'sdn1aarea', width: 100,columnGroupShow: 'open', },            
    //               { cellClass:['data'],headerName: 'Number', field: 'sdn1aaccomp', width: 100,  type: 'valueColumn',},
    //             ]
    //           }
    //         ]
    //       },
    //       { headerName: 'District 2',
    //         children:[   
    //           { headerName: 'Target', 
    //             children:[
    //               { cellClass:['data'],headerName: 'Area', field: 'sdn2area', width: 100,columnGroupShow: 'open', },            
    //               { cellClass:['data'],headerName: 'Number', field: 'sdn2target', width: 100,  type: 'valueColumn',},      
    //               { cellClass:['data'],headerName: 'Unit Cost', field: 'sdn2cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter, },      
    //               { cellClass:['data'],headerName: 'Total Cost', field: 'sdn2totalcost', width: 100,columnGroupShow: 'open', 
    //                 valueGetter:'Number(data.sdn2target) * Number(data.sdn2cost)', valueFormatter: this.currencyFormatter,
    //               },  
    //             ]
    //           },
    //           { headerName: 'Accomplishment', 
    //             children:[
    //               { cellClass:['data'],headerName: 'Area', field: 'sdn2aarea', width: 100,columnGroupShow: 'open', },            
    //               { cellClass:['data'],headerName: 'Number', field: 'sdn2aaccomp', width: 100,  type: 'valueColumn',},
    //             ]
    //           }
    //         ]
    //       },
    //     ]
    //   },
    //   { headerName: 'Surigao del Sur', 
    //     children:[
    //       { headerName: 'District 1',
    //         children:[   
    //           { headerName: 'Target', 
    //             children:[
    //               { cellClass:['data'],headerName: 'Area', field: 'sds1area', width: 100,columnGroupShow: 'open', },            
    //               { cellClass:['data'],headerName: 'Number', field: 'sds1target', width: 100, type: 'valueColumn',},      
    //               { cellClass:['data'],headerName: 'Unit Cost', field: 'sds1cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter,},      
    //               { cellClass:['data'],headerName: 'Total Cost', field: 'sds1totalcost', width: 100,columnGroupShow: 'open', 
    //                 valueGetter:'Number(data.sds1target) * Number(data.sds1cost)', valueFormatter: this.currencyFormatter,
    //               },  
    //             ]
    //           },
    //           { headerName: 'Accomplishment', 
    //             children:[
    //               { cellClass:['data'],headerName: 'Area', field: 'sds1aarea', width: 100,columnGroupShow: 'open', },            
    //               { cellClass:['data'],headerName: 'Number', field: 'sds1aaccomp', width: 100,  type: 'valueColumn',},
    //             ]
    //           }
    //         ]
    //       },
    //       { headerName: 'District 2',
    //         children:[   
    //           { headerName: 'Target', 
    //             children:[
    //               { cellClass:['data'],headerName: 'Area', field: 'sds2area', width: 100,columnGroupShow: 'open', },            
    //               { cellClass:['data'],headerName: 'Number', field: 'sds2target', width: 100,  type: 'valueColumn',},      
    //               { cellClass:['data'],headerName: 'Unit Cost', field: 'sds2cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter,},      
    //               { cellClass:['data'],headerName: 'Total Cost', field: 'sds2totalcost', width: 100,columnGroupShow: 'open', 
    //                 valueGetter:'Number(data.sds2target) * Number(data.sds2cost)', valueFormatter: this.currencyFormatter,},  
    //             ]
    //           },
    //           { headerName: 'Accomplishment', 
    //             children:[
    //               { cellClass:['data'],headerName: 'Area', field: 'sds2aarea', width: 100,columnGroupShow: 'open', },            
    //               { cellClass:['data'],headerName: 'Number', field: 'sds2aaccomp', width: 100,  type: 'valueColumn',},
    //             ]
    //           }
    //         ]
    //       },
    //     ]
    //   },
    //   { headerName: 'Province of Dinagat Islands', 
    //     children:[
    //       { headerName: 'District 1',
    //         children:[   
    //           { headerName: 'Target', 
    //             children:[
    //               { cellClass:['data'],headerName: 'Area', field: 'pdi1area', width: 100,columnGroupShow: 'open', },            
    //               { cellClass:['data'],headerName: 'Number', field: 'pdi1target', width: 100, type: 'valueColumn',},      
    //               { cellClass:['data'],headerName: 'Unit Cost', field: 'pdi1cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter,},      
    //               { cellClass:['data'],headerName: 'Total Cost', field: 'pdi1totalcost', width: 100,columnGroupShow: 'open', 
    //                 valueGetter:'Number(data.pdi1target) * Number(data.pdi1cost)', valueFormatter: this.currencyFormatter,
    //               },  
    //             ]
    //           },
    //           { headerName: 'Accomplishment', 
    //             children:[
    //               { cellClass:['data'],headerName: 'Area', field: 'pdi1aarea', width: 100,columnGroupShow: 'open', },            
    //               { cellClass:['data'],headerName: 'Number', field: 'pdi1aaccomp', width: 100,  type: 'valueColumn',},
    //             ]
    //           }
    //         ]
    //       },
    //     ]
    //   },
    //   { headerName: 'Butuan City', 
    //     children:[
    //       { headerName: '',
    //         children:[   
    //           { headerName: 'Target', 
    //             children:[
    //               { cellClass:['data'],headerName: 'Area', field: 'bxu1area', width: 100,columnGroupShow: 'open', },            
    //               { cellClass:['data'],headerName: 'Number', field: 'bxu1target', width: 100, type: 'valueColumn',},      
    //               { cellClass:['data'],headerName: 'Unit Cost', field: 'bxu1cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter,},      
    //               { cellClass:['data'],headerName: 'Total Cost', field: 'bxu1totalcost', width: 100,columnGroupShow: 'open', 
    //                 valueGetter:'Number(data.bxu1target) * Number(data.bxu1cost)', valueFormatter: this.currencyFormatter,
    //               },  
    //             ]
    //           },
    //           { headerName: 'Accomplishment', 
    //             children:[
    //               { cellClass:['data'],headerName: 'Area', field: 'bxu1aarea', width: 100,columnGroupShow: 'open', },            
    //               { cellClass:['data'],headerName: 'Number', field: 'bxu1aaccomp', width: 100,  type: 'valueColumn',},
    //             ]
    //           }
    //         ]
    //       },
    //     ]
    //   },
    //   {
    //     headerName: 'Remarks', 
    //     children:[
    //       { cellClass:['data'],headerName: 'Q1', field: 'q1r', width: 100, editable:true, cellEditor: 'agLargeTextCellEditor'}, 
    //       { cellClass:['data'],headerName: 'Q2', field: 'q2r', width: 100, editable:true, cellEditor: 'agLargeTextCellEditor'}, 
    //       { cellClass:['data'],headerName: 'Q3', field: 'q3r', width: 100, editable:true, cellEditor: 'agLargeTextCellEditor'}, 
    //       { cellClass:['data'],headerName: 'Q4', field: 'q4r', width: 100, editable:true, cellEditor: 'agLargeTextCellEditor'}, 
    //     ]
    //   },
     ]

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
        cellClass: 'number-cell'
      },
      totalColumn: {
        aggFunc: 'sum',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellClass: 'number-cell'
      }
    };

    this.components = { simpleCellRenderer: getSimpleCellRenderer() };
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