import { Tag } from './tag'; // ← adapte si ton chemin est différent

export class Note {
    id!: number;
    title!: string;
    content!: string;
    tags!: Tag[];
  }
  
