import { Component, signal } from '@angular/core';
import { UserSelectComponent } from './components/user-select/user-select.component';
import { PostListComponent } from './components/post-list/post-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserSelectComponent, PostListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  selectedUserId = signal(1);
  onUserSelected(userId: number) {
    this.selectedUserId.set(userId);
  }
}
