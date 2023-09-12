import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JWT_TOKEN } from 'src/app/constants/constants';
import { getRequestOption } from 'src/app/helpers/helper';
import { Task } from 'src/app/models/Task';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class OrderIndexService {
  baseUrl = `${environment.apiBaseUrl}/order-index`;

  private orderList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.fetchOrderList();
  }
  private fetchOrderList() {
    this.http.get<any>(this.baseUrl, getRequestOption()).subscribe(
      (res) => this.orderList$.next(res.result),
      (err) => console.error(err)
    )
  }

  getAll(query?: any) {
    return this.orderList$.asObservable();
  }

  // addNewTask(data: any) {
  //   return this.http.post<Task>(this.baseUrl, data, getRequestOption());
  // }

  // updateTask(id: any, data: any) {
  //   return this.http.put<any>(
  //     `${this.baseUrl}/${id}`,
  //     data,
  //     getRequestOption()
  //   );
  // }

  // updatePropTask(id: any, data: any) {
  //   return this.http.patch(`${this.baseUrl}/${id}`, data, getRequestOption());
  // }

  // deleteTask(id: any) {
  //   return this.http.delete(`${this.baseUrl}/${id}`);
  // }
}
