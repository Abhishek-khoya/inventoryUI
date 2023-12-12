import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categories } from 'src/app/models/Categories';
import { CategoryService } from 'src/app/services/category/category.service';
import { AddCategoriesComponent } from '../add-categories/add-categories.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss']
})
export class EditCategoriesComponent {
  
  constructor(private commonService:CommonService,private snackBar:MatSnackBar,private dialogRef:MatDialogRef<AddCategoriesComponent>,private categoriesService:CategoryService,@Inject(MAT_DIALOG_DATA) public editData:any,private formBuilder:FormBuilder){}
  categoryForm!:FormGroup;
  updateCategoryRequest:Categories={
    categoryId:0,
    categoryName:""
  }
  categoryPattern!:"^[a-zA-Z ]{2,20}$";
  ngOnInit():void{
    this.categoryForm=this.formBuilder.group({
      categoryName:['',[Validators.required,Validators.pattern(this.categoryPattern)]]
    })
    console.log(this.editData);
    if(this.editData)
    {
      this.categoryForm.controls['categoryName'].setValue(this.editData.categoryName)
    }
  }
  updateCategories()
  {
    this.updateCategoryRequest.categoryId=this.editData.categoryId;
    this.updateCategoryRequest.categoryName=this.categoryForm.value.categoryName
    console.log(this.updateCategoryRequest);
    this.categoriesService.updateCategories(this.editData.categoryId,this.updateCategoryRequest).subscribe({
      next:()=>{
        this.commonService.openSnackBar("Category Updated Successfully");
        this.categoryForm.reset();
        this.dialogRef.close(true);
      },error:(error)=>{
        console.log(error)
      }
    })
  }

}
