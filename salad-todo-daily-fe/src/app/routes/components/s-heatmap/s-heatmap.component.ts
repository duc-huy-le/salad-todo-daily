import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-s-heatmap',
  templateUrl: './s-heatmap.component.html',
  styleUrls: ['./s-heatmap.component.css'],
})
export class SHeatmapComponent implements OnInit {
  @Input() chartId!: string;
  @Input() heatMapStyle: any = {};
  @Input() xAxis: any = {};
  @Input() yAxis: any = {};
  @Input() legendSettings: Object = {
    visible: false,
  }; // Scroll bar
  @Input() titleSettings: Object = {};
  @Input() cellSettings: Object = {};
  @Input() paletteSettings: Object = {}; //Dải màu
  @Input() dataSource: any[] = [];
  @Input() tooltipRender?: (ev: any) => void;
  // dataSource = [
  //   [73, 39, 26, 39, 94, 0],

  //   [93, 58, 53, 38, 26, 68],

  //   [99, 28, 22, 4, 66, 90],

  //   [14, 26, 97, 69, 69, 3],

  //   [7, 46, 47, 47, 88, 6],

  //   [41, 55, 73, 23, 3, 0],

  //   [56, 69, 21, 86, 3, 33],

  //   [45, 7, 53, 81, 95, 79],

  //   [60, 77, 74, 68, 88, 51],

  //   [25, 25, 10, 12, 78, 14],

  //   [25, 56, 55, 58, 12, 82],

  //   [74, 33, 88, 23, 86, 59],
  // ];
  // xAxis: Object = {
  //   labels: [
  //     'Nancy',
  //     'Andrew',
  //     'Janet',
  //     'Margaret',
  //     'Steven',
  //     'Michael',
  //     'Robert',
  //     'Laura',
  //     'Anne',
  //     'Paul',
  //     'Karin',
  //     'Mario',
  //   ],
  // };
  constructor() {}

  ngOnInit(): void {}

  onTooltipRender(ev: any) {
    if (typeof this.tooltipRender === 'function') {
      this.tooltipRender(ev);
    }
  }
}
