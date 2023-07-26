import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JWT_TOKEN } from 'src/app/constants/constants';
import { TaskTag } from 'src/app/models/TaskTag';

@Injectable({
  providedIn: 'root',
})
export class TaskTagService {
  baseUrl = 'http://localhost:3000/tag';
  requestOption: any;
  constructor(private http: HttpClient) {
    this.getRequestOption();
  }

  getRequestOption() {
    const token = this.getJwtToken();
    const headers = { authorization: token };
    this.requestOption = { headers: headers };
  }

  getJwtToken(): string {
    return localStorage.getItem(JWT_TOKEN)!;
  }

  getAllTaskTag() {
    return this.http.get<any>(this.baseUrl, this.requestOption);
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
