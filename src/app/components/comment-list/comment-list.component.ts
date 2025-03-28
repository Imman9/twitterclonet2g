import { Component, Input, Signal, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-list.component.html',
})
export class CommentListComponent {
  @Input() postId!: number;
  comments = signal<{ id: number; name: string; body: string }[]>([]);

  ngOnChanges() {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${this.postId}`)
      .then((res) => res.json())
      .then((data) => this.comments.set(data));
  }
}
