export class TaskDaily {
  id: any;
  name: string;
  description: string;
  tagId: number[];
  constructor(id: any, name: string, description: string, tagId: number[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.tagId = tagId;
  }

}
