export class Note {
  id: any;
  title: string;
  content: string;
  createdAt: Date;
  constructor(id: any, title: string, content: string, createdAt: Date) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
  }
}
