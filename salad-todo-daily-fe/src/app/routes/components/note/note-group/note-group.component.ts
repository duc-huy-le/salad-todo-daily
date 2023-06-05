import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit(): void {
    this.getAllTaskDaily();
  }

  getAllTaskDaily() {
    this.noteService.getAllTaskDaily().toPromise().then((response) => {
      this.listNote = response;
    })
  }

}
