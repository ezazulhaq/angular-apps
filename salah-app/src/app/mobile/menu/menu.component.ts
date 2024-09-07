import { Component, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-mobile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  latitude = input.required<number>();
  longitude = input.required<number>();

  constructor(private router: Router) { }

  onClickPrayer() {
    this.router.navigate(
      ["prayer"],
      {
        queryParams: {
          latitude: this.latitude(),
          longitude: this.longitude()
        }
      })
  }

}
