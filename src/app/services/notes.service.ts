import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs'
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notes: Note[] = [];
  private notesSubject = new BehaviorSubject<Note[]>([]);

  private isEdit = new BehaviorSubject<boolean>(false);

  constructor() { }

  getNotesObservable(): Observable<Note[]> {
    return this.notesSubject.asObservable()
  }

  createNote(note: Note): void {
    note.id = new Date().getTime();
    this.notes.push(note);
    this.notesSubject.next(this.notes)
  }

  deleteNote(id: number): void {
    this.notes = this.notes.filter(note => note.id !== id)
    this.notesSubject.next(this.notes) // to update the notes for all hierarchy
  }

  setEditable(value: boolean) {
    this.isEdit.next(value);
  }

  getEditable(){
    return this.isEdit.asObservable()
  }

}