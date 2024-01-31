import { Component, Input, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Notes } from 'src/app/interfaces/notes';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {
  noteForm!: FormGroup
  constructor(private notesService:NotesService, private formBuilder: FormBuilder){}
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
    console.log(this.noteForm.value)
 }
}
