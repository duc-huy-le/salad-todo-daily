export class Project {
  id: any;
  name: string;
  color: string;
  description: string;
  isDeleted: number;
  startDate: Date;
  totalTask: number;
  completedTask: number;
  constructor(
    id: any,
    name: string,
    color: string,
    description: string,
    isDeleted: number,
    startDate: Date,
    totalTask: number,
    completedTask: number
  ) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.description = description;
    this.isDeleted = isDeleted;
    this.startDate = startDate;
    this.totalTask = totalTask;
    this.completedTask = completedTask;
  }
}
