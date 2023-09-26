export class DailyTask {
  id: any;
  name: string;
  description: string;
  tagId: number[];
  startDate: Date;
  finishDate: Date;
  priority: number;
  schedule: number[];
  createdAt: Date;
  isDeleted: boolean;
  checked: boolean;
  tagName: string[];
  tagColor: string[];
  constructor(
    id: any,
    name: string,
    description: string,
    tagId: number[],
    startDate: Date,
    finishDate: Date,
    priority: number,
    schedule: number[],
    createdAt: Date,
    isDeleted: boolean,
    checked: boolean,
    tagName: string[],
    tagColor: string[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.tagId = tagId;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.priority = priority;
    this.schedule = schedule;
    this.createdAt = createdAt;
    this.isDeleted = isDeleted;
    this.checked = checked;
    this.tagName = tagName;
    this.tagColor = tagColor;
  }
}
