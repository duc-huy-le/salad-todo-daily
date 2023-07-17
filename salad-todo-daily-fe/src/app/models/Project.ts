export class Project {
  id: any;
  name: string;
  color: string;
  description: string;
  isDeleted: number;
  startDate: Date;
  constructor(
    id: any,
    name: string,
    color: string,
    description: string,
    isDeleted: number,
    startDate: Date
  ) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.description = description;
    this.isDeleted = isDeleted;
    this.startDate = startDate;
  }
}
