import { Injectable, signal } from '@angular/core';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  profilePicture: string;
  coverPhoto: string;
  bio: string;
  following: number;
  followers: number;
  tweets: number;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  createdAt: string;
  likes: number;
  replies: number;
  retweets: number;
}

export interface Reply {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  createdAt: string;
  likes: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];
  private posts: Post[] = [];
  private replies: Reply[] = [];

  selectedUser = signal<User | null>(null);
  userPosts = signal<Post[]>([]);
  userReplies = signal<Reply[]>([]);
  isLoading = signal<boolean>(true);

  constructor() {
    this.loadInitialData();
  }

  private async loadInitialData() {
    try {
      this.isLoading.set(true);

      // Fetch users
      const usersResponse = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const usersData = await usersResponse.json();

      // Transform users data to match our User interface
      this.users = usersData.map((user: any) => ({
        id: user.id,
        name: user.name,
        username: `@${user.username}`,
        email: user.email,
        profilePicture: `https://i.pravatar.cc/150?img=${user.id}`,
        coverPhoto: `https://picsum.photos/1500/500?random=${user.id}`,
        bio: `${user.company.catchPhrase} | ${user.company.bs}`,
        following: Math.floor(Math.random() * 1000),
        followers: Math.floor(Math.random() * 5000),
        tweets: Math.floor(Math.random() * 500),
      }));

      // Fetch posts
      const postsResponse = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );
      const postsData = await postsResponse.json();

      // Transform posts data to match our Post interface
      this.posts = postsData.map((post: any) => ({
        id: post.id,
        userId: post.userId,
        title: post.title,
        body: post.body,
        createdAt: new Date(
          Date.now() - Math.random() * 10000000000
        ).toISOString(),
        likes: Math.floor(Math.random() * 100),
        replies: Math.floor(Math.random() * 20),
        retweets: Math.floor(Math.random() * 50),
      }));

      // Fetch comments
      const commentsResponse = await fetch(
        'https://jsonplaceholder.typicode.com/comments'
      );
      const commentsData = await commentsResponse.json();

      // Transform comments data to match our Reply interface
      this.replies = commentsData.map((comment: any) => ({
        id: comment.id,
        postId: comment.postId,
        name: comment.name,
        email: comment.email,
        body: comment.body,
        createdAt: new Date(
          Date.now() - Math.random() * 10000000000
        ).toISOString(),
        likes: Math.floor(Math.random() * 20),
      }));

      // Initialize with first user
      this.selectUser(1);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  selectUser(userId: number) {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      this.selectedUser.set(user);
      this.loadUserContent(userId);
    }
  }

  loadUserContent(userId: number) {
    // Load posts for the selected user
    const userPosts = this.posts.filter((p) => p.userId === userId);
    this.userPosts.set(userPosts);

    // Load replies for the selected user's posts
    const userPostIds = userPosts.map((p) => p.id);
    const userReplies = this.replies.filter((r) =>
      userPostIds.includes(r.postId)
    );
    this.userReplies.set(userReplies);
  }

  getPostReplies(postId: number): Reply[] {
    return this.replies.filter((r) => r.postId === postId);
  }

  getUsers(): User[] {
    return this.users;
  }

  getIsLoading(): boolean {
    return this.isLoading();
  }
}
