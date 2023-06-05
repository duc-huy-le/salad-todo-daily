import { Component, OnInit } from '@angular/core';

class NavItem {
  index: number;
  name: string;
  icon: string;
  selected: boolean;
  constructor(name: string, index: number, selected: boolean, icon?: string) {
    this.name = name;
    this.index = index;
    this.selected = selected;
    this.icon = icon?? '';
  }
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  listNavItems: NavItem[] = [
    new NavItem("Trang chủ", 0, true, "fa-columns"),
    new NavItem("Thống kê", 1, false),
    new NavItem("Dự án", 2, false),
    new NavItem("Việc hàng ngày", 3, false),
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
