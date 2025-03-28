import { Component, Input, Signal, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from '../comment-list/comment-list.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, CommentListComponent],
  templateUrl: './post-list.component.html',
})
export class PostListComponent {
  @Input() userId!: number;
  posts = signal<{ id: number; title: string; body: string }[]>([]);
  selectedPostId = signal<number | null>(null);

  ngOnChanges() {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.userId}`)
      .then((res) => res.json())
      .then((data) => this.posts.set(data));
  }

  selectPost(postId: number) {
    this.selectedPostId.set(postId);
  }

  // Function to toggle comment visibility
  toggleComments(postId: number) {
    this.selectedPostId() === postId
      ? this.selectedPostId.set(null) // Hide comments if already open
      : this.selectedPostId.set(postId); // Show comments if closed
  }
}
