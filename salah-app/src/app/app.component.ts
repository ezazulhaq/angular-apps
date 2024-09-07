import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrayerTimesComponent } from './prayer-times/prayer-times.component';
import { MenuComponent } from './mobile/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PrayerTimesComponent,
    MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  selectedLat!: number;
  selectedLng!: number;
  error: string = "";

  constructor() {
    this.getLocation();
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.selectedLat = position.coords.latitude;
          this.selectedLng = position.coords.longitude;

          console.log({ 'latitude': this.selectedLat, 'longitude': this.selectedLng })
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              this.error = "Please enable location permissions for this site in your browser settings.";
              break;
            case error.POSITION_UNAVAILABLE:
              this.error = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              this.error = "The request to get user location timed out.";
              break;
            default:
              this.error = "An unknown error occurred.";
              break;
          }
        }
      );
    } else {
      this.error = "Geolocation is not supported by this browser.";
    }
  }
}
