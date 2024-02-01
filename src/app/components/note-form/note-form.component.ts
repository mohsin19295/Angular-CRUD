import { Component, Input, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from 'src/app/interfaces/note';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {
  noteForm!: FormGroup;
  isEdit!: boolean;
  constructor(private notesService: NotesService, private formBuilder: FormBuilder) {
    this.notesService.getEditable().subscribe({
      next: (response) => (this.isEdit = response)
    })
  }
  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      id: new Date().getTime(),
      title: ['', Validators.required],
      content: ['']
    })
  }

  handleSubmit(): void{
    if (this.noteForm.invalid) {
      return;
    }
    const note: Note = this.noteForm.value;
    // console.log(note);

    this.notesService.createNote(note);
    // this.notesService.getNotesObservable().subscribe((notes: Note[]) => {
    //   console.log(notes)
    // })
    
    this.noteForm.reset();
  }
}
