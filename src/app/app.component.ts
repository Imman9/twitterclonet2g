import { Component, signal } from '@angular/core';
import { UserSelectComponent } from './components/user-select/user-select.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserSelectComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedUserId = signal(1);
  onUserSelected(userId: number) {
    this.selectedUserId.set(userId);
  }
}
