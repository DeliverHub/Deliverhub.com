import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiurl + 'Order/';
constructor(private http: HttpClient) { }
PostOrder(data:any){
  debugger;
  console.log(localStorage.getItem('token'))
  return this.http.post<any>(this.baseUrl+'CreateOrder',data,httpOptions)
}
}
var headers_object = new HttpHeaders({
  'Content-Type': 'application/json',
   'Authorization': "Bearer "+localStorage.getItem('token')
});
const httpOptions = {
  headers: headers_object
};