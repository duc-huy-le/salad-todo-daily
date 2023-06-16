import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseUrl: string = "https://api.telegram.org/bot5898997604:AAEMTODc64xcrLeP1yBMAXOJbt6ziaJmIEc/";
  constructor(private http: HttpClient) { }

  sendMessage(chatId: any, message: string) {
    var sendMessageUrl = `${this.baseUrl}sendMessage?chat_id=${chatId}&text=${message}`;
    return this.http.get(sendMessageUrl);
  }
}
