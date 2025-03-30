import {
  Component,
  EventEmitter,
  Output,
  Signal,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-user-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-select.component.html',
})
export class UserSelectComponent {
  @Output() userSelected = new EventEmitter<number>();
  users = signal<User[]>([]);
  isLoading = signal<boolean>(true);

  constructor(private userService: UserService) {
    // Update users when loading state changes
    effect(() => {
      if (!this.userService.getIsLoading()) {
        this.users.set(this.userService.getUsers());
        this.isLoading.set(false);
      }
    });
  }

  onUserChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const userId = Number(target.value);
    this.userService.selectUser(userId);
    this.userSelected.emit(userId);
  }
}
