import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device/device.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-dashboard-screen',
  templateUrl: './dashboard-screen.component.html',
  styleUrls: ['./dashboard-screen.component.css'],
})
export class DashboardScreenComponent implements OnInit {
  isMobile: boolean = false;
  constructor(
    private deviceService: DeviceService
  ) {
    this.isMobile = deviceService.isMobile;
  }

  ngOnInit(): void {}
}
