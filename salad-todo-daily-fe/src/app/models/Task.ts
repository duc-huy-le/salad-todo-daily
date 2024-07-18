export class Task {
  id: any;
  name: string;
  projectId: any;
  description: string;
  startDate: Date;
  finishDate: Date | null;
  priority: number;
  status: number;
  duration: number;
  completedDuration: number;
  checkList: Array<TaskCheckList>;
  createdAt: Date;
  isDeleted: boolean;
  priorityColor: string;
  priorityLabel: string;
  constructor(
    id: any,
    name: string,
    projectId: any,
    description: string,
    startDate: Date,
    finishDate: Date,
    priority: number,
    status: number,
    duration: number,
    completedDuration: number,
    checkList: Array<TaskCheckList>,
    createdAt: Date,
    isDeleted: boolean,
    priorityColor: string,
    priorityLabel: string
  ) {
    this.id = id;
    this.name = name;
    this.projectId = projectId;
    this.description = description;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.priority = priority;
    this.status = status;
    this.duration = duration;
    this.completedDuration = completedDuration;
    this.checkList = checkList;
    this.createdAt = createdAt;
    this.isDeleted = isDeleted;
    this.priorityColor = priorityColor;
    this.priorityLabel = priorityLabel;
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
