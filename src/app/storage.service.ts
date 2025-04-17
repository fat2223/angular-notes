import { Injectable } from '@angular/core';
import { Tag } from './tag';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly TAGS_KEY = 'tags';
  private readonly NOTES_KEY = 'notes';


  constructor() {}

  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
  

  getTags(): Tag[] {
    if (!this.isLocalStorageAvailable()) return [];
    
    const t = localStorage.getItem(this.TAGS_KEY);
    return t ? JSON.parse(t) : [];
  }

  saveTags(tags: Tag[]): void {
    if (!this.isLocalStorageAvailable()) return;

    localStorage.setItem(this.TAGS_KEY, JSON.stringify(tags));
  }

  addTag(tag: Tag): void {
    const tags = this.getTags();
    tags.push(tag);
    this.saveTags(tags);
  }

  deleteTag(id: number): void {
    const tags = this.getTags().filter(tag => tag.id !== id);
    this.saveTags(tags);
  }
  saveNotes(notes: Note[]): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.NOTES_KEY, JSON.stringify(notes));
    }
  }
  getNotes(): Note[] {
    if (!this.isBrowser()) {
      return [];
    }
    const data = localStorage.getItem(this.NOTES_KEY);
    return data ? JSON.parse(data) : [];
  }
  
  addNote(note: Note): void {
    const notes = this.getNotes();
    notes.push(note);
    this.saveNotes(notes);
  }
  
  deleteNote(id: number): void {
    const notes = this.getNotes().filter(n => n.id !== id);
    this.saveNotes(notes);
  }
  

  
}
