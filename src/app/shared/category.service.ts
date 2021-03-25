import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FbCreateResponse, TreeData } from "./interfaces";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  createCategory(category: any): Observable<TreeData> {
    return this.http.post(`${environment.fbDbUrl}/categories.json`, category)
      .pipe(
        map((response: FbCreateResponse) => {
          return {
            ...category,
            fbId: response.name,
          }
        }))
  }

  getAllCategories(): Observable<TreeData[]> {
    return this.http.get(`${environment.fbDbUrl}/categories.json`)
      .pipe(map((response: { [key: string]: any }) => {
        return Object.keys(response).map(key => ({
          ...response[key],
          fbId: key,
        }))
      }))
  }

  getCategoryById(fbId: string): Observable<TreeData> {
    return this.http.get<TreeData>(`${environment.fbDbUrl}/categories/${fbId}.json`)
      .pipe(map((category: TreeData) => {
        return {
          ...category,
          fbId,
        }
      }))
  }

  removeCategoryById(fbId: string): Observable<TreeData[]> {
    return this.http.delete<TreeData[]>(`${environment.fbDbUrl}/categories/${fbId}.json`);
  }

  updateCategoryById(category: TreeData, fbId: string): Observable<TreeData> {    
    return this.http.patch<TreeData>(`${environment.fbDbUrl}/categories/${fbId}.json`, category);
  }
}
