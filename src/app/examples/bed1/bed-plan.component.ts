import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { MfoService } from '../services/mfo.service';

@Component({
  selector: 'bed-plan',
  template: `

  <div class="row item" [ngClass]="routeAnimationsElements">
        <div class="col-md-10">
        <h3>Financial Targets</h3>
            </div>
            <div  class="col-md-2">
              <button  mat-raised-button class="information" (click)="export()">EXPORT to EXCEL</button> 
               
            </div>
  </div> <br>
  <ag-grid-angular 
    style="width: 100%; height: 400px;" 
    class="ag-theme-balham"
    [rowData]="rowData" 
    [columnDefs]="columnDefs"
    [columnTypes]="columnTypes"
    [components]="components"
    [enableSorting]="true"
    [enableFilter]="true"
    [enableColResize]="true"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [groupRowAggNodes]="groupRowAggNodes"
    [groupRemoveSingleChildren]="true"
    [groupDefaultExpanded]=-1
    [excelStyles]="excelStyles"
    [rowSelection]="rowSelection"
    [suppressAggFuncInHeader]= "true"
    (gridReady)="onGridReady($event)"
    (cellValueChanged)="onCellValueChanged($event)"
    >
</ag-grid-angular>
  `
})
export class BedPlanComponent implements OnInit, OnChanges{

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
  user: any;
  excelStyles:any;
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 
  @Input() pid: number = 0;
  @Input() name: string = '';

  
  ngOnInit(){
    
  }

  ngOnChanges(changes:any) {
    console.log(changes.pid.currentValue);
    this.mfoService.getMFOPhysical(changes.pid.currentValue).subscribe(data => {
      this.rowData = data;
      console.log(data);
    });
  }

  export(){
    var ck=["mfo_name","janft", "febft", "marft","Q1", "aprft", "mayft", "junft" ,"Q2" , "julft", "augft", "sepft" ,"Q3", "octft", "novft", "decft" ,"Q4","to"];
    var prog_ou=this.user.username;
    console.log(this.pid);
    if(this.pid!=0) prog_ou=this.name+" - M&E Generated";
    if(prog_ou.substring(0, 7)=="budget_") prog_ou  = prog_ou.substring(7, prog_ou.length+1);
    this.gridApi.exportDataAsExcel({
      customHeader  : [
        [{styleId:'headappend',data:{type:'String', value:'DEPARTMENT OF AGRICULTURE'}}],
        [{styleId:'headappend',data:{type:'String', value:'Regional Field Office XIII'}}],
        [{styleId:'headappend',data:{type:'String', value:'BED1 Report 2019'}}],
        [{styleId:'headappend',data:{type:'String', value:prog_ou.toUpperCase()}}],
        [{styleId:'headappend',data:{type:'String', value:'C.Y. 2019 CURRENT APPROPRIATION'}}],
        [{styleId:'headappend',data:{type:'String', value: 'PMIS v4.0 Generated as of '+this.months[new Date().getMonth()]+' '+new Date().getDate()+', '+new Date().getFullYear()}}],
        [],
        [ {data: {type:'String', value:''}},
         {styleId:'t',data:{type:'String', value:'Financial Targets', mergeAcross:17}},
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
        else return params.value;
      },
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    if(this.pid===0) this.pid = this.user.pid;
    this.mfoService.getMFOPhysical(this.pid).subscribe(data => {
      this.rowData = data;
      console.log(data);
    });
    console.log(this.pid);
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
      { id: "p1", interior: { color: "#BBDAFF", pattern: 'Solid' }, font: { size:11, fontName: "Calibri", bold: true }, },
      { id: "p2", interior: { color: "#86BCFF", pattern: 'Solid' }, font: { size:11, fontName: "Calibri", bold: true }, },
      { id: "t", interior: { color: "#fddfdf", pattern: 'Solid' }, font: { size:11, fontName: "Calibri", bold: true }, alignment:{horizontal:'Center'}},
      { id: "a", interior: { color: "#ffb7b2", pattern: 'Solid' }, font: { size:11, fontName: "Calibri", bold: true }, alignment:{horizontal:'Center'}},
      { id: "d1", interior: { color: "#92FEF9", pattern: 'Solid' }, font: { size:11, fontName: "Calibri", bold: true }, },
      { id: "d2", interior: { color: "#01FCEF", pattern: 'Solid' }, font: { size:11, fontName: "Calibri", bold: true }, },
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
      {
        headerName: 'Financial Targets',
        children: [
          {
            cellClass:['data'],headerName: 'Jan',
            field: 'janft',
            width: 70,
            type: 'valueColumn'
          },
          {
            cellClass:['data'],headerName: 'Feb',
            field: 'febft',
            width: 70,
            type: 'valueColumn'
          },
          {
            cellClass:['data'],headerName: 'Mar',
            field: 'marft',
            width: 70,
            type: 'valueColumn'
          },
          {
            cellClass:['data','p1'],headerName: 'Q1',
            field: 'Q1',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#b23c9a' },
            valueGetter:
              'Number(data.janft) + Number(data.febft) + Number(data.marft)',
            type: 'valueColumn'
          },
          {
            cellClass:['data'],headerName: 'Apr',
            field: 'aprft',
            width: 70,
            type: 'valueColumn'
          },
          {
            cellClass:['data'],headerName: 'May',
            field: 'mayft',
            width: 70,
            type: 'valueColumn'
          },
          {
            cellClass:['data'],headerName: 'Jun',
            field: 'junft',
            width: 70,
            type: 'valueColumn'
          },
          {
            cellClass:['data','p1'],headerName: 'Q2',
            field: 'Q2',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#b23c9a' },
            valueGetter:
              'Number(data.aprft) + Number(data.mayft) + Number(data.junft)',
            type: 'valueColumn'
          },
          {
            cellClass:['data'],headerName: 'Jul',
            field: 'julft',
            width: 70,
            type: 'valueColumn'
          },
          {
            cellClass:['data'],headerName: 'Aug',
            field: 'augft',
            width: 70,
            type: 'valueColumn'
          },
          {
            cellClass:['data'],headerName: 'Sep',
            field: 'sepft',
            width: 70,
            type: 'valueColumn'
          },
          {
            cellClass:['data','p1'],headerName: 'Q3',
            field: 'Q3',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#b23c9a' },
            valueGetter:
              'Number(data.julft) + Number(data.augft) + Number(data.sepft)',
            type: 'valueColumn'
          },
          {
            cellClass:['data'],headerName: 'Oct',
            field: 'octft',
            width: 70,
            type: 'valueColumn'
          },
          {
            cellClass:['data'],headerName: 'Nov',
            field: 'novft',
            width: 70,
            type: 'valueColumn'
          },
          {
            cellClass:['data'],headerName: 'Dec',
            field: 'decft',
            width: 70,
            type: 'valueColumn'
          },
          {
            cellClass:['data','p1'],headerName: 'Q4',
            field: 'Q4',
            width: 70,
            cellStyle: { color: 'white', 'background-color': '#b23c9a' },
            valueGetter:
              'Number(data.octft) + Number(data.novft) + Number(data.decft)',
            type: 'valueColumn'
          },
          {
            cellClass:['data','p2'],headerName: 'TOTAL',
            field: 'to',
            width: 120,
            columnGroupShow: 'closed',
            cellStyle: { color: 'white', 'background-color': '#ef7109' },
            valueGetter:
              'Number(data.janft) + Number(data.febft) + Number(data.marft) + Number(data.aprft) + Number(data.mayft) + Number(data.junft) + Number(data.julft) + Number(data.augft) + Number(data.sepft) + Number(data.octft) + Number(data.novft) + Number(data.decft)',
            type: 'totalColumn'
          }
        ]
      },
    ]
     
    this.autoGroupColumnDef = {
      headerName: 'PAP',
      cellRenderer: 'agGroupCellRenderer',
      pinned: 'left',
      width: 300,
      field: 'mfo_name',
      cellRendererParams: {
        suppressCount: true, 
        innerRenderer: 'simpleCellRenderer'
      }
    };

    this.components = { simpleCellRenderer: getSimpleCellRenderer() };

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
