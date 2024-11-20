import { Component, effect, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  menuvisible = input.required<boolean>();
  menuClose = output<boolean>();

  protected localMenuVisible = signal(false);

  constructor() {
    effect(() => {
      console.log("menuvisible - " + this.menuvisible());
      this.localMenuVisible.set(this.menuvisible());
    }, { allowSignalWrites: true });
  }

  onMenuItemClick() {
    this.localMenuVisible.set(false);
    this.menuClose.emit(false)
  }

}
