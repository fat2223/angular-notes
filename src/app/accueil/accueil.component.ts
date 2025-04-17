import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../note.model';
import { NoteComponent } from '../note/note.component';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-accueil',
  standalone: true,
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
  imports: [CommonModule, FormsModule, NoteComponent]
})
export class AccueilComponent implements OnInit {
  searchTerm: string = '';
  notes: Note[] = [];
  filteredNotes: Note[] = [];

  constructor(private noteService: StorageService) {}

  ngOnInit() {
    this.notes = this.noteService.getNotes(); 
    this.filteredNotes = this.notes;
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredNotes = this.notes;
      return;
    }

    this.filteredNotes = this.notes.filter(note =>
      note.title.toLowerCase().includes(term) ||
      note.content.toLowerCase().includes(term) ||
      note.tags.some(tag => tag.name.toLowerCase().includes(term))
    );
  }

  
  clearSearch() {
    this.searchTerm = '';
    this.onSearch();
  }
  
}
