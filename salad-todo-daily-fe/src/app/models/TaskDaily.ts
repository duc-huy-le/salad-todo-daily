export class TaskDaily {
  id: any;
  name: string;
  description: string;
  tagId: number[];
  tagName: string[] = [];
  constructor(id: any, name: string, description: string, tagId: number[], tagName?: string[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.tagId = tagId;
    this.tagName = tagName ?? [];
  }

}
