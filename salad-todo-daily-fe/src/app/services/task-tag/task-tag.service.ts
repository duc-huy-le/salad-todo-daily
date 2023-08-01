import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JWT_TOKEN } from 'src/app/constants/constants';
import { getRequestOption } from 'src/app/helpers/helper';
import { TaskTag } from 'src/app/models/TaskTag';

@Injectable({
  providedIn: 'root',
})
export class TaskTagService {
  baseUrl = 'http://localhost:3000/tag';
  constructor(private http: HttpClient) {
  }

  getAllTaskTag() {
    return this.http.get<any>(this.baseUrl, getRequestOption());
  }

  addNewTag(data: any) {
    return this.http.post<TaskTag>(this.baseUrl, data, getRequestOption());
  }

  updateTag(id: any, data: any) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data, getRequestOption());
  }

  updatePropTag(id: any, data: any) {
    return this.http.patch(`${this.baseUrl}/${id}`, data, getRequestOption());
  }

  // getMatchById(id: any) {
  //   return this.http.get(`${this.baseUrl}/${id}`);
  // }

  // createNewMatch(data: any) {
  //   return this.http.post(this.baseUrl, data);
  // }

  // deleteMatch(id:any) {
  //   return this.http.delete(`${this.baseUrl}/${id}`);
  // }

  // updateMatch(id: any, data: any) {
  //   // const testData = {
  //   //   hour: '05:00',
  //   //   session: 'Sáng',
  //   //   weekdays: 'Chủ Nhật',
  //   //   day: '15/10/2022',
  //   //   stadium: 'SVĐ Suối',
  //   //   memberObj: ['001', '002', '003', '004', '005'],
  //   // };
  //   // console.log(testData);
  //   // debugger;
  //   return this.http.put(`${this.baseUrl}/${id}`, data);
  // }
}
