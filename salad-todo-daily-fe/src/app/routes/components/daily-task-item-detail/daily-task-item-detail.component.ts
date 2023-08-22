import { Component, Input, OnInit } from '@angular/core';
import { ITooltipEventArgs } from '@syncfusion/ej2-angular-heatmap';
import { Internationalization } from '@syncfusion/ej2-base';
import { DailyTask } from 'src/app/models/DailyTask';
import { TaskTag } from 'src/app/models/TaskTag';
import { DailyTaskStatisticService } from 'src/app/services/daily-task/daily-task-statistic.service';

@Component({
  selector: 'app-daily-task-item-detail',
  templateUrl: './daily-task-item-detail.component.html',
  styleUrls: ['./daily-task-item-detail.component.css'],
})
export class DailyTaskItemDetailComponent implements OnInit {
  @Input() dailyTask!: DailyTask;
  listTaskTag?: TaskTag[];

  listAllDailyTaskHeatmapData: any[] = [];
  heatmapData: any;
  startFrom!: Date;
  today: Date = new Date();
  yAxis: Object = {
    labels: ['Chủ nhật', 'Thứ 7', 'Thứ 6', 'Thứ 5', 'Thứ 4', 'Thứ 3', 'Thứ 2'],
    isInversed: true,
    // opposedPosition: true,
  };
  xAxis: Object = {
    opposedPosition: true,
    valueType: 'DateTime',
    minimum: this.getStartFrom(),
    maximum: this.today,
    intervalType: 'Days',
    showLabelOn: 'Months',
    labelFormat: 'MMM',
    increment: 7,
  };
  titleSettings: Object = {
    // text: 'Lịch sử thực hiện thói quen',
    // textStyle: {
    //   size: '15px',
    //   fontWeight: '500',
    //   fontStyle: 'Normal',
    //   fontFamily: 'Segoe UI',
    // },
  };
  paletteSettings: Object = {
    // palette: [
    //     { value: 0, color: 'rgb(238,238,238)', label: 'no contributions' },
    //     { value: 1, color: 'rgb(172, 213, 242)', label: '1-15 contributions' },
    //     { value: 16, color: 'rgb(127, 168, 201)', label: '16-31 contributions' },
    //     { value: 32, color: 'rgb(82, 123, 160)', label: '31-49 contributions' },
    //     { value: 50, color: 'rgb(37, 78, 119)', label: '50+ contributions' },
    // ],
    type: 'Fixed',
    emptyPointColor: 'white',
  };

  constructor(private dailyTaskStatisticService: DailyTaskStatisticService) {}

  ngOnInit(): void {
    this.getListHeatmapData();
  }

  ngOnChanges(): void {
    this.listTaskTag = JSON.parse(localStorage.getItem('listTaskTag')!);
    this.transformDailyTaskData();
  }

  transformDailyTaskData() {
    this.dailyTask.tagName = this.getTaskTagName(this.dailyTask.tagId);
    this.dailyTask.tagColor = this.getTaskTagColor(this.dailyTask.tagId);
  }

  getTaskTagName(tagId: any[]): string[] {
    const listTag = this.listTaskTag?.filter((item) => tagId.includes(item.id));
    return listTag!.map((item) => item.name);
  }

  getTaskTagColor(tagId: any[]): string[] {
    const listTag = this.listTaskTag?.filter((item) => tagId.includes(item.id));
    return listTag!.map((item) => item.color);
  }

  getListHeatmapData() {
    this.dailyTaskStatisticService
      .getDailyTaskHeatmapData()
      .subscribe((res) => {
        this.listAllDailyTaskHeatmapData = res;
        const heatmapInfo = this.listAllDailyTaskHeatmapData.find(
          (item) => item.dailyTaskId === this.dailyTask.id
        );
        this.heatmapData = heatmapInfo?.data;
        this.startFrom = heatmapInfo?.startFrom;
      });
  }

  tooltipRender(args: ITooltipEventArgs): void {
    let intl: Internationalization = new Internationalization();
    let format: Function = intl.getDateFormat({ format: 'EEE MMM dd, yyyy' });
    let newDate: Date = <Date>args.xValue;
    let date: Date = new Date(newDate.getTime());
    let axisLabel: string[] = args.heatmap.axisCollections[1].axisLabels;
    let index: number = axisLabel.indexOf(args.yLabel);
    date.setDate(date.getDate() + index);
    let value: string = format(date);
    args.content = [
      (args.value === 0 ? 'Không' : 'Có') + ' ' + 'thực hiện' + '<br>' + value,
    ];
  }

  getStartFrom(): Date {
    let startDate = new Date(
      this.today.getFullYear() - 1,
      this.today.getMonth(),
      this.today.getDate()
    );
    // Lấy ra ngày đầu tuần lúc đó
    const dayOfWeek = startDate.getDay();
    const diff = startDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    startDate = new Date(startDate.setDate(diff));
    return startDate;
  }
}
