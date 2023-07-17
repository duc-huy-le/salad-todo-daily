export class Task {
  id: any;
  name: string;
  projectId: any;
  description: string;
  startDate: Date;
  finishDate: Date;
  priority: number;
  status: number;
  checkList: Array<TaskCheckList>;
  createdAt: Date;
  isDeleted: boolean;
  constructor(id: any, name: string, projectId: any, description: string, startDate: Date, finishDate: Date, priority: number, status: number, checkList: Array<TaskCheckList>, createdAt: Date, isDeleted: boolean) {
    this.id = id;
    this.name = name;
    this.projectId = projectId;
    this.description = description;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.priority = priority;
    this.status = status;
    this.checkList = checkList;
    this.createdAt = createdAt;
    this.isDeleted = isDeleted;
  }
}

export class TaskCheckList {
  checked: boolean;
  content: string;
  constructor(checked: boolean, content: string) {
    this.checked = checked;
    this.content = content;
  }
}
