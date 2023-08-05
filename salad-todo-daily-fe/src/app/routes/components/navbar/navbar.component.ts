import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

class NavItem {
  index: number;
  name: string;
  icon: string;
  selected: boolean;
  routerLink: string;
  constructor(
    name: string,
    index: number,
    selected: boolean,
    routerLink: string,
    icon?: string
  ) {
    this.name = name;
    this.index = index;
    this.selected = selected;
    this.routerLink = routerLink;
    this.icon = icon ?? '';
  }
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentLink?: string;

  listNavItems: NavItem[] = [
    new NavItem('Trang chủ', 0, true, '/home/dashboard', 'fa-columns'),
    new NavItem('Thống kê', 1, false, '/a', 'fa-list'),
    new NavItem('Quản lý danh mục', 2, false, '/home/project', 'fa-project-diagram'),
    new NavItem('Việc hàng ngày', 3, false, '/', 'fa-calendar'),
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onChangeNav(nav: NavItem) {
    this.listNavItems = this.listNavItems.map((item) => {
      item.selected = item.index === nav.index;
      return item;
    });
    this.router.navigate([nav.routerLink]);
  }
}
