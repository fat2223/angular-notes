import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Tag } from '../tag';
import { TagComponent } from '../tag/tag.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tags',
  imports: [TagComponent, FormsModule],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  loaded = false;
  tags: Tag[] = [];
  editing: Tag | null = null;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags() {
    if (!this.loaded) {
      this.tags = this.storageService.getTags();
      this.loaded = true;
    }
  }

  AddTag(): void {
    this.editing = this.createTag('');
  }

  EditTag(tag: Tag): void {
    this.editing = { ...tag }; 
  }

  saveTag(): void {
    if (!this.editing) return;

    if (this.editing.id === 0) {
      this.editing.id = Date.now();
      this.tags.push(this.editing);
    } else {
      const index = this.tags.findIndex(t => t.id === this.editing!.id);
      if (index !== -1) {
        this.tags[index] = this.editing;
      }
    }

    this.storageService.saveTags(this.tags);
    this.editing = null;
  }

  cancel(): void {
    this.editing = null;
  }

  deleteTag(tag: Tag): void {
    if (confirm(`Supprimer le tag "${tag.name}" ?`)) {
      this.storageService.deleteTag(tag.id);
      this.tags = this.tags.filter(t => t.id !== tag.id);
    }
  }

  dialogAddTag(): boolean {
    const name = window.prompt("Nom du tag ?");
    if (name?.trim()) {
      const newTag = this.createTag(name);
      this.tags.push(newTag);
      this.storageService.saveTags(this.tags);
    }
    return false;
  }

  private createTag(name: string): Tag {
    return {
      id: 0,
      name: name.trim(),
      color: '#ff0000'
    };
  }
}
