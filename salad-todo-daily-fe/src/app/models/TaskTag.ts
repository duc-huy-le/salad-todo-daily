export class TaskTag {
  id: any;
  name: string;
  color: string;
  isDeleted: boolean;
  constructor(id: any, name: string, color: string, isDeleted: boolean) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.isDeleted = isDeleted;
  }
}
