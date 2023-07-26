import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JWT_TOKEN } from 'src/app/constants/constants';
import { Note } from 'src/app/models/Note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
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
    return localStorage.getItem(JWT_TOKEN)!;
  }
  getAllNote() {
    return this.http.get<any>(this.baseUrl, this.requestOption);
  }
}
