import { Routes } from '@angular/router';
import { TagsComponent } from './tags/tags.component';
import { NotesComponent } from './notes/notes.component';
import { AccueilComponent } from './accueil/accueil.component';

export const routes: Routes = [
  { path: 'tags', component: TagsComponent },
  { path: 'note', component: NotesComponent },
  {path:'',component:AccueilComponent},
];