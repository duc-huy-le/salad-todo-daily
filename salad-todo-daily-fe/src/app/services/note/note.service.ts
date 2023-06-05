import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from 'src/app/models/Note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  baseUrl =
    'http://localhost:3000/task-note';

  constructor(private http: HttpClient) {}

  getAllTaskDaily(){
    return this.http.get<Note[]>(this.baseUrl);
  }
}
