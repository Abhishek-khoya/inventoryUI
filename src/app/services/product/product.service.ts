import {HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseApiUrl:String="http://localhost:8080"
  constructor(private http:HttpClient) { }
  getAllProducts():Observable<Product[]>
  {
    return this.http.get<Product[]>(this.baseApiUrl+"/products")
  }
  getProductById(id:Number):Observable<Product>
  {
    return this.http.get<Product>(this.baseApiUrl+"/products/"+id)
  }
  addProduct(product:Product):Observable<Product>
  {
    return this.http.post<Product>(this.baseApiUrl+"/products/",product)
  }
  updateProduct(id:Number,product:Product):Observable<Product>
  {
    return this.http.put<Product>(this.baseApiUrl+"/products/"+id,product);
  }
  deleteProduct(id:Number):Observable<Product>
  {
    return this.http.delete<Product>(this.baseApiUrl+"/products/"+id);
  }
}
