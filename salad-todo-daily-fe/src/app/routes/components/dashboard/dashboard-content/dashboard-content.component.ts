import { Component, OnInit } from '@angular/core';

// interface ViewItem {
//   index: number;
//   name: string;
//   icon: string;
//   selected: boolean;
// }

enum ViewType {
  Kanban = 0,
  List = 1,
  Calendar = 2,
}

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css']
})
export class DashboardContentComponent implements OnInit {
  currentViewType: ViewType = ViewType.Kanban;
  ViewType = ViewType;
  constructor() { }

  ngOnInit(): void {
  }

}
