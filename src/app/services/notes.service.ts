import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs'
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notes: Note[] = [];
  private notesSubject = new BehaviorSubject<Note[]>([])

  constructor() { }

  getNotesObservable(): Observable<Note[]>{
    return this.notesSubject.asObservable()
  }

  createNote(note: Note): void{
    note.id = new Date().getTime();
    this.notes.push(note);
    this.notesSubject.next(this.notes)
  }
}