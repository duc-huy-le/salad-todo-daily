export class Project {
  id: any;
  name: string;
  color: string;
  description: string;
  isDeleted: number;
  startDate: Date;
  finishDate: Date;
  totalTask: number;
  completedTask: number;
  constructor(
    id: any,
    name: string,
    color: string,
    description: string,
    isDeleted: number,
    startDate: Date,
    finishDate: Date,
    totalTask: number,
    completedTask: number
  ) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.description = description;
    this.isDeleted = isDeleted;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.totalTask = totalTask;
    this.completedTask = completedTask;
  }
}
