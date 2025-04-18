import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../note.model';
import { Tag } from '../tag';
import { StorageService } from '../storage.service';
import { NoteComponent } from '../note/note.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule, NoteComponent],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  loaded = false;
  editing: Note | null = null;
  tags: Tag[] = [];

  @Output() notesChange = new EventEmitter<Note[]>();

  constructor(private noteService: StorageService) {}

  ngOnInit(): void {
    this.loadNotes();
    this.tags = this.noteService.getTags();
  }

  loadNotes(): void {
    this.notes = this.noteService.getNotes();
    this.loaded = true;
    this.notesChange.emit(this.notes); 
  }

  Add(): void {
    this.editing = { id: 0, title: '', content: '', tags: [] };
  }

  Edit(note: Note): void {
    this.editing = {
      ...note,
      tags: [...note.tags]
    };
  }

  cancel(): void {
    this.editing = null;
  }

  saveNote(): void {
    if (!this.editing) return;
  
    const isNew = this.editing.id === 0;
  
    if (isNew) {
      const newNote: Note = {
        ...this.editing,
        id: Date.now()
      };
      this.noteService.addNote(newNote);
    } else {
      this.noteService.updateNote(this.editing);
    }
  
    this.editing = null;
    this.loadNotes(); 
  }
  

  deleteNote(id: number): void {
    this.noteService.deleteNote(id);
    this.loadNotes();
  }

  Tags(tag: Tag): boolean {
    return this.editing?.tags?.some(t => t.id === tag.id) ?? false;
  }

  NoteTags(tag: Tag): void {
    if (!this.editing) return;

    const index = this.editing.tags.findIndex(t => t.id === tag.id);
    if (index === -1) {
      this.editing.tags.push(tag);
    } else {
      this.editing.tags.splice(index, 1);
    }
  }

 
}
