import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Categories } from 'src/app/models/Categories';
import { CategoryService } from 'src/app/services/category/category.service';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoriesComponent } from '../add-categories/add-categories.component';
import { EditCategoriesComponent } from '../edit-categories/edit-categories.component';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent {
  
  displayedColumns: string[] = ['categoryId', 'categoryName','actions'];
  dataSource!: MatTableDataSource<Categories> 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private commonService:CommonService, private categoriesService:CategoryService,private formBuilder:FormBuilder,private matDialog:MatDialog){}
  
  ngOnInit():void{
    this.getAllCategories();
  }
  
 addCategories()
 {
  this.matDialog.open(AddCategoriesComponent,{
    width:"300px",
    height:"210px"
  }).afterClosed().subscribe((val)=>{
    if(val){
      this.getAllCategories();
    }
  })
 }
 updateCategories(row:any)
 {
  this.matDialog.open(EditCategoriesComponent,{
    width:"300px",
    height:"210px",
    data:row
  }).afterClosed().subscribe((val)=>{
    if(val){
      this.getAllCategories();
    }
  })
 }
 deleteCategories(id:Number)
 {
  if(confirm("Are you sure ?"))
  {
    this.categoriesService.deleteCategories(id).subscribe({
      next:()=>{
        this.commonService.openSnackBar("Category deleted");
        this.getAllCategories();
      },error:()=>{
        alert("category not deleted");
      }
    })
  }
 }

  getAllCategories()
  {
    this.categoriesService.getAllCategories().subscribe({
      next:(categories)=>{
        console.log(categories);
        //this.category=categories;
        this.dataSource=new MatTableDataSource<Categories>(categories);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort
      },error:(error)=>{
        console.log(error);
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

