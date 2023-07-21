export class TaskDailyHistory {
  id: any;
  taskDailyId: any;
  completionDate: any;
  constructor(id: any, taskDailyId: string, completionDate: string) {
    this.id = id;
    this.taskDailyId = taskDailyId;
    this.completionDate = completionDate;
  }
}
