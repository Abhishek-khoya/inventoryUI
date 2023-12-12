import { Component, ViewChild } from '@angular/core';
import { MatDateFormats } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/Product';
import { CommonService } from 'src/app/services/common/common.service';
import { ProductService } from 'src/app/services/product/product.service';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent {
  constructor(private matDialog:MatDialog, private commonService:CommonService, private productService:ProductService){}
  displayedColumns: string[] = ['productId', 'productName', 'description', 'price','quantity','category','actions'];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  ngOnInit()
  {
    this.getAllProducts()
  }
  getAllProducts()
  {
    this.productService.getAllProducts().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource<Product>(res);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
        console.log(res);
      },
      error:(error)=>
      {
        console.log(error);
      }
    })
  }
  addProduct()
  {
    this.matDialog.open(AddProductComponent,{
      height:"500px",
      width:"700px"
    }).afterClosed().subscribe({
      next:(val)=>{
        if(val)
        {
          this.getAllProducts();
        }

      }
    })
  }
  updateProduct(row:any)
  {
    
  }
  deleteProduct(row:Number)
  {
    this.productService.deleteProduct(row).subscribe({
      next:()=>{
        this.commonService.openSnackBar("Product Deleted");
        this.productService.getAllProducts();
      },error:()=>{
        this.commonService.openSnackBar("Product Not Deleted");
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
