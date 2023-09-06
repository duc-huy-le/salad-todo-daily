import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getRequestOption } from 'src/app/helpers/helper';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DailyTaskStatisticService {
  baseUrl = `${environment.apiBaseUrl}/task-daily-statistic`;
  private dailyTaskHeatmapDataList$: BehaviorSubject<any[]> =
    new BehaviorSubject<any[]>([]);
  constructor(private http: HttpClient) {
    this.fetchDailyTaskHeatmapData();
  }

  getDailyTaskHeatmapData() {
    return this.dailyTaskHeatmapDataList$.asObservable();
    // return this.http.get<any>(
    //   `${this.baseUrl}/heatmap-data`,
    //   getRequestOption()
    // );
  }

  private fetchDailyTaskHeatmapData() {
    this.http.get<any>(`${this.baseUrl}/heatmap-data`, getRequestOption()).subscribe(
      (res) => this.dailyTaskHeatmapDataList$.next(res.result),
      (err) => console.error(err)
    );
  }
}
