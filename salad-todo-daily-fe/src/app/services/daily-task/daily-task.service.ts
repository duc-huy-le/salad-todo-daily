import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JWT_TOKEN } from 'src/app/constants/constants';
import { getRequestOption } from 'src/app/helpers/helper';
import { DailyTask } from 'src/app/models/DailyTask';

@Injectable({
  providedIn: 'root',
})
export class DailyTaskService {
  baseUrl = 'http://localhost:3000/task-daily';
  private dailyTaskList$: BehaviorSubject<DailyTask[]> = new BehaviorSubject<
  DailyTask[]
  >([]);
  private dailyTaskToday$: BehaviorSubject<DailyTask[]> = new BehaviorSubject<
  DailyTask[]
  >([]);

  constructor(private http: HttpClient) {
    this.fetchTaskDailyList();
    this.fetchTaskDailyToday();
  }

  private fetchTaskDailyList() {
    this.http.get<any>(this.baseUrl, getRequestOption()).subscribe(
      (res) => this.dailyTaskList$.next(res.result),
      (err) => console.error(err)
    );
  }
  private fetchTaskDailyToday() {
    this.http.get<any>(`${this.baseUrl}/today`, getRequestOption()).subscribe(
      (res) => this.dailyTaskToday$.next(res.result),
      (err) => console.error(err)
    );
  }
  getAllTaskDaily() {
    return this.dailyTaskList$.asObservable();
  }
  getAllTaskDailyToday() {
    return this.dailyTaskToday$.asObservable();
  }
  // getAllTaskDaily() {
  //   return this.http.get<any>(this.baseUrl, getRequestOption());
  // }
  // getAllTaskDailyToday() {
  //   return this.http.get<any>(`${this.baseUrl}/today`, getRequestOption());
  // }

  addNewTaskDaily(data: any) {
    return this.http.post<DailyTask>(this.baseUrl, data, getRequestOption());
  }

  updateTaskDaily(id: any, data: any) {
    return this.http.put<DailyTask>(
      `${this.baseUrl}/${id}`,
      data,
      getRequestOption()
    );
  }

  updatePropTaskDaily(id: any, data: any) {
    return this.http.patch(`${this.baseUrl}/${id}`, data, getRequestOption());
  }

  deleteTaskDaily(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
