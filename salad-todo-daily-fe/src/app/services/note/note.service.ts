import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from 'src/app/models/Note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly USER_INFO = 'TODO_DAILY_USER_INFO';

  baseUrl = 'http://localhost:3000/note';
  requestOption: any;

  constructor(private http: HttpClient) {
    this.getRequestOption();
  }
  getRequestOption() {
    const token = this.getJwtToken();
    const headers = { authorization: token };
    this.requestOption = { headers: headers };
  }

  getJwtToken(): string {
    return localStorage.getItem(this.JWT_TOKEN)!;
  }
  getAllNote() {
    return this.http.get<any>(this.baseUrl, this.requestOption);
  }
}
