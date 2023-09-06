import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/common/loading/loading.service';

@Component({
  selector: 'app-base-screen',
  templateUrl: './base-screen.component.html',
  styleUrls: ['./base-screen.component.css']
})
export class BaseScreenComponent implements OnInit {

  constructor(
    protected loadingService: LoadingService
  ) { }

  ngOnInit(): void {
  }
  setLoading(state: boolean): void {
    this.loadingService.setLoading(state);
  }

}
