import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from 'src/app/interfaces/note';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit, OnChanges {
  noteForm!: FormGroup;
  isEdit!: boolean;
  @Input() selectedNote!: Note;
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedNote']?.currentValue) {
      const value = changes['selectedNote']?.currentValue;
      this.noteForm.patchValue({
        id: value.id,
        title: value.title,
        content: value.content
      })
    }
  }

  handleSubmit(): void{
    if (this.noteForm.invalid) {
      return;
    }
    const note: Note = this.noteForm.value;
    
    if (this.isEdit) {
      this.notesService.updateNote(note);
      this.notesService.setEditable(false);
    } else {
      this.notesService.createNote(note);
    }

    // console.log(note);
    // this.notesService.getNotesObservable().subscribe((notes: Note[]) => {
    //   console.log(notes)
    // })

    this.noteForm.reset();
  }
}
