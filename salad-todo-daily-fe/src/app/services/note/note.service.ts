import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JWT_TOKEN } from 'src/app/constants/constants';
import { getRequestOption } from 'src/app/helpers/helper';
import { Note } from 'src/app/models/Note';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  baseUrl = `${environment.apiBaseUrl}/note`;

  constructor(private http: HttpClient) {
  }

  getAllNote() {
    return this.http.get<any>(this.baseUrl, getRequestOption());
  }
}
