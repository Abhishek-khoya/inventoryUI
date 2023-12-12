import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Categories } from 'src/app/models/Categories';
import { CategoryService } from 'src/app/services/category/category.service';
import { ListCategoriesComponent } from '../list-categories/list-categories.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss']
})
export class AddCategoriesComponent {

  constructor(private snackBar:MatSnackBar,private commonService:CommonService, private categoriesService:CategoryService,private formBuilder:FormBuilder,private dialogRef:MatDialogRef<AddCategoriesComponent>){}
  categoryForm!:FormGroup;
  addCategoryRequest:Categories={
    categoryId:0,
    categoryName:""
  }
  categoryPattern!:"^[a-zA-Z ]{2,20}$";
  ngOnInit():void{
    this.categoryForm=this.formBuilder.group({
      categoryName:['',[Validators.required,Validators.pattern(this.categoryPattern)]]
    })
  }
  addCategories()
  {
    if(this.categoryForm.valid)
    {
      this.addCategoryRequest=this.categoryForm.value;
      this.categoriesService.addCategories(this.addCategoryRequest).subscribe({
        next:()=>{
          this.commonService.openSnackBar("Category Added Successfully");
          this.categoryForm.reset();
          this.dialogRef.close(true);
          //this.listComponent.getAllCategories();          
        },error:(error)=>{
          console.log(error);
        }
      });
    }
  }
  

}
