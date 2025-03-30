import { Component, OnInit, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService, User, Post, Reply } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  private userService = inject(UserService);

  user = this.userService.selectedUser;
  posts = this.userService.userPosts;
  replies = this.userService.userReplies;
  activeTab: 'tweets' | 'replies' | 'media' | 'likes' = 'tweets';

  constructor() {
    // Update content when user changes
    effect(() => {
      const currentUser = this.user();
      if (currentUser) {
        this.userService.loadUserContent(currentUser.id);
      }
    });
  }

  ngOnInit(): void {}

  setActiveTab(tab: 'tweets' | 'replies' | 'media' | 'likes'): void {
    this.activeTab = tab;
  }

  getPostReplies(postId: number): Reply[] {
    return this.userService.getPostReplies(postId);
  }
}
