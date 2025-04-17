import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../note.model';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note.component.html',
  styleUrls:['./note.component.css']

})
export class NoteComponent {
  @Input() note!: Note;
  @Output() edit = new EventEmitter<Note>();
  @Output() delete = new EventEmitter<number>();
 
  onEdit() {
    this.edit.emit(this.note);
  }

  onDelete() {
    this.delete.emit(this.note.id);
  }
}
