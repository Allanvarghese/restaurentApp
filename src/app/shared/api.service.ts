import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }
  // here i will define POST,GET,PUT,DELETE

  //CREATE restaurent using POST method
  postRestaurent(data:any){
    return this._http.post<any>("https://jsonplaceholder.typicode.com/posts",data).pipe(map((res:any)=>{
      return res;
    }))
  }

  //Get restaurent data using GET Method
  getRestaurent(){
    return this._http.get<any>("https://jsonplaceholder.typicode.com/posts").pipe(map((res:any)=>{
      return res;
    }))
  }

  //Update Restaurent data using PUT method
  updateRestaurent(data:any,id:number){
    return this._http.put<any>("https://jsonplaceholder.typicode.com/posts/"+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }

    //delete Restaurent data using DELETE method
    deleteRestaurent(id:number){
      return this._http.delete<any>("https://jsonplaceholder.typicode.com/posts/"+id).pipe(map((res:any)=>{
        return res;
      }))
    }
}
