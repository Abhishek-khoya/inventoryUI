import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from 'src/app/models/Categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseApiUrl:string="http://localhost:8080"
  constructor(private http:HttpClient) { }
  getAllCategories():Observable<Categories[]>
  {
    return this.http.get<Categories[]>(this.baseApiUrl+"/categories")
  }
  addCategories(addCategoryRequest:Categories):Observable<Categories>
  {
    return this.http.post<Categories>(this.baseApiUrl+"/categories",addCategoryRequest);
  }
  getCategories(id:Number):Observable<Categories>
  {
    return this.http.get<Categories>(this.baseApiUrl+"/categories/"+id);
  }
  updateCategories(id:Number,updateCategoryRequest:Categories):Observable<Categories>
  {
    return this.http.put<Categories>(this.baseApiUrl+"/categories/"+id,updateCategoryRequest);
  }
  deleteCategories(id:Number):Observable<Categories>
  {
    return this.http.delete<Categories>(this.baseApiUrl+"/categories/"+id)
  }
}
