import { HostListener, Injectable, Renderer2 } from '@angular/core';

export enum DeviceType {
  PC,
  TABLET,
  MOBILE,
}
@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  currentDevice!: DeviceType;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkDeviceType();
  }
  isMobile!: boolean;
  constructor() {
    this.checkDeviceType();
  }

  checkDeviceType() {
    const screenWidth = window.innerWidth;

    // Use a media query to determine the device type
    if (screenWidth < 768) {
      this.isMobile = true; // Mobile device
      this.currentDevice = DeviceType.MOBILE;
    } else {
      this.isMobile = false; // Laptop or desktop
      this.currentDevice = DeviceType.PC;
    }
  }
}
