import { Component } from '@angular/core';
import { TaskTagService } from './services/task-tag/task-tag.service';
import { TaskTag } from './models/TaskTag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'salad-todo-daily-fe';
  listTaskTag?: TaskTag[];

  constructor(private taskTagService: TaskTagService) {}
  ngOnInit(): void {
    this.getAllTaskTag();
  }
  getAllTaskTag() {
    this.taskTagService
      .getAllTaskTag()
      .toPromise()
      .then((response) => {
        this.listTaskTag = response;
        localStorage.setItem('listTaskTag', JSON.stringify(response));
      });
  }
}
