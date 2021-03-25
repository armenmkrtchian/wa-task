
import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

import { CategoryService } from '../../../shared/category.service';
import { ViewModeEnum } from '../../../shared/enums/enums';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category, DialogData, TreeData } from '../../../shared/interfaces';

@Component({
  selector: 'app-add-edit-category-dialog',
  templateUrl: './add-edit-category-dialog.component.html',
  styleUrls: ['./add-edit-category-dialog.component.scss']
})
export class AddEditCategoryDialogComponent implements OnInit {

  public ViewModeEnum = ViewModeEnum;
  public viewMode = ViewModeEnum.CreateMode;
  form: FormGroup = this.fb.group({
    categoryName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: CategoryService
  ) {

  }

  ngOnInit() {
    this.viewMode = this.data.viewMode;    
    if (this.data.categoryName) {
      this.form.setValue({ categoryName: this.data.categoryName });
    }
  }

  onSave(formValue?: TreeData) {
    let request;
    if(this.viewMode === ViewModeEnum.CreateMode){
       request = {
        id: String(this.data.nodesQuantity + 1) ,
        parentId: (this.data.isTop) ? null: this.data.currentCategory.id,
        categoryName: formValue.categoryName,
      };
    } else {
      request = {
        id: this.data.currentCategory.id,
        parentId:  this.data.currentCategory.parentId,
        categoryName: formValue.categoryName,
      };
    }
    if (this.viewMode === ViewModeEnum.EditMode && formValue && formValue.categoryName) {
      this.service.updateCategoryById(request, this.data.currentCategory.fbId).subscribe(() => {
        this.dialogRef.close('ok');
      })
    } else {
      this.service.createCategory(request).subscribe(() => {
        this.dialogRef.close('ok');
      });
    }
  }


}
