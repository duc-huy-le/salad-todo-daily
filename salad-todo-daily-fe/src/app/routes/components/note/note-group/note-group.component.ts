import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Note } from 'src/app/models/Note';
import { NoteService } from 'src/app/services/note/note.service';

@Component({
  selector: 'app-note-group',
  templateUrl: './note-group.component.html',
  styleUrls: ['./note-group.component.css']
})
export class NoteGroupComponent implements OnInit {

  listNote?: Note[];
  constructor(
    private noteService: NoteService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.getAllTaskDaily();
  }

  getAllTaskDaily() {
    this.noteService.getAllNote().toPromise().then((res: any) => {
      if(res && res.result) {
        this.listNote = res.result;
      } else {
        this.msg.error('Có lỗi xảy ra. Không thể lấy danh sách ghi chú.');
      }
    })
  }

}
