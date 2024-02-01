import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/interfaces/note';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes: Note[] = []

  constructor(private notesService: NotesService) { }
  
  ngOnInit(): void {
    this.notesService.getNotesObservable().subscribe((notes: Note[]) => {
      this.notes = notes
    })
  }

  deleteNote(id: number): void{
    this.notesService.deleteNote(id);
  }

  editNote(): void{

  }
}
