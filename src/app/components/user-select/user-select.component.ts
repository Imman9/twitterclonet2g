import {
  Component,
  EventEmitter,
  Output,
  Signal,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-select.component.html',
})
export class UserSelectComponent {
  @Output() userSelected = new EventEmitter<number>();
  users = signal<{ id: number; username: string }[]>([]);

  constructor() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => this.users.set(data));
  }

  onUserChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.userSelected.emit(Number(target.value));
  }
}
