import { Component, Input, OnInit, Inject } from '@angular/core';
import { MfoService } from '../services/mfo.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { concat } from 'rxjs/operators';



@Component({
  template: `
  <h3 mat-dialog-title>{{data.mfo_name}}</h3>
  <mat-dialog-content>
  <div class="container">
  <ag-grid-angular 
    style="width: 100%; height: 400px;" 
    class="ag-theme-balham"
    [rowData]="rowData" 
    [columnDefs]="columnDefs"
    [enableColResize]="true"
    [enableSorting]="true"
    (cellValueChanged)="onCellValueChanged($event)"
    (gridReady)="onGridReady($event)"
    >
  </ag-grid-angular>
    </div>
    <div  class="col-md-2">
            <button style="margin:5px;" mat-raised-button class="default" (click)="doneClicked()">
                Done
        </button> 
        <br>
    </div>
  </mat-dialog-content>

  `,
})
export class districtDetailsDialog implements OnInit{
    gridApi: any;
    rowData: any;

    columnDefs = [
        {headerName: 'Area', field: 'municipal', width: 150,},
        {headerName: 'Target', field: 'target', width: 100,},
        {headerName: 'Accomplishment', field: 'accomp', width: 100,editable:true}
    ];

    constructor(private mfoService: MfoService,@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<districtDetailsDialog>, private snackBar: MatSnackBar){

    }
    ngOnInit() {
         console.log(this.data);
        this.mfoService.getDistrictDetails(this.data).subscribe(data =>{
            this.rowData = data;
            //console.log(this.rowData);
        }); 
    }
    onGridReady(event){
        this.gridApi = event.api;
    }
    updateLogs(id: number, value: number, col: string, month: string, beds: number, prov: string, dist: string, mun: string) {
        const uid = JSON.parse(localStorage.getItem('currentUser'));
        // console.log("4 here");
        this.mfoService
          .updateLogs(id, value, uid.user_id, col, month, beds,prov,dist,mun)
          .subscribe(data => console.log(data));
      }
    onCellValueChanged(event){
        if(event.data.target<Number(event.data.accomp)||isNaN(Number(event.data.accomp))){
            var mes="";
            if(isNaN(Number(event.data.accomp))) mes="Error: Please entry a number less than or equal to the target.";
            else mes = "Error: Accomplishment inputted is greater than the target.";
            this.snackBar.open(mes, null, { duration: 3000, panelClass: 'error-notification-overlay'});
            event.node.setDataValue(event.colDef.field,event.oldValue);
        }else{
            console.log(event.data);
            var data = event.data;
            this.mfoService.updateDistrictDetails(data).subscribe(data =>{
                //console.log("here");
                //console.log(this.updateLogs);
                this.updateLogs(event.data.mfo_id, event.newValue, event.data.mfo_name, event.colDef.field, 4,event.data.province,event.data.district,event.data.municipal);
                //this.rowData = data;
            }); 
        }
    }
    doneClicked(){
        //console.log("done clicked!");
        // for loop for all municipality then concat as one line & get 
        var children = this.gridApi.rowModel.rootNode.allLeafChildren;
        //console.log(children);
        var total=0;
        var str=""
        children.forEach(element => {
            var accomp = Number(element.data.accomp);
            if(accomp!=0 && !isNaN(accomp)){
               // this.str = concat(this.str,element.data.municipal,"(",element.data.accomp,"), ");
                str = str+element.data.municipal+"("+element.data.accomp+"), ";
                total=total+accomp;
                //console.log(str);
            }
        });
        this.dialogRef.close({str:str,total:total,prvnc:this.data.prvnc,district:this.data.district});
    }
}