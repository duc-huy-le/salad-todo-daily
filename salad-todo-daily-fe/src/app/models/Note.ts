export class Note {
  id: any;
  title: string;
  content: string;
  createdAt: Date;
  isDeleted: boolean;
  constructor(id: any, title: string, content: string, createdAt: Date, isDeleted: boolean) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.isDeleted = isDeleted;
  }
}
