export class Project {
  id: any;
  name: string;
  description: string;
  isDeleted: boolean;
  startDate: Date;
  constructor(
    id: any,
    name: string,
    description: string,
    isDeleted: boolean,
    startDate: Date
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isDeleted = isDeleted;
    this.startDate = startDate;
  }
}
