export class TaskDaily {
  id: any;
  name: string;
  description: string;
  tagId: number[];
  startDate: Date;
  finishDate: Date;
  priority: number;
  createdAt: Date;
  isDeleted: boolean;
  checked: boolean;
  constructor(
    id: any,
    name: string,
    description: string,
    tagId: number[],
    startDate: Date,
    finishDate: Date,
    priority: number,
    createdAt: Date,
    isDeleted: boolean,
    checked: boolean
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.tagId = tagId;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.priority = priority;
    this.createdAt = createdAt;
    this.isDeleted = isDeleted;
    this.checked = checked;
  }
}
