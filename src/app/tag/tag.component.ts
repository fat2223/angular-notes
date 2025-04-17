import { Component,input } from '@angular/core';

@Component({
  selector: 'app-tag',
  imports: [],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent {
  id = input<number>(0);
  name = input<string>('');
  color = input<string>('#000000'); 
}
