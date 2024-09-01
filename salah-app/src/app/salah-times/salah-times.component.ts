import { Component, computed, input, OnInit, signal } from '@angular/core';
import { PrayerService } from '../service/prayer.service';
import { CommonModule, DatePipe } from '@angular/common';
import { OpenStreetMapErrorResponse, OpenStreetMapResponse } from '../model/open-stream-map.model';

@Component({
  selector: 'app-salah-times',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './salah-times.component.html',
  styleUrl: './salah-times.component.css'
})
export class SalahTimesComponent implements OnInit {
  latitude = input.required<number>();
  longitude = input.required<number>();

  address = signal<string>("");

  getTimes = computed(() => {
    const times = this.prayerService.getPrayerTimes(this.latitude(), this.longitude());
    if (!times) return null;

    return Object.entries(times)
      .map(([key, value]) => ({ key, value: new Date(value) }))
      .sort((a, b) => a.value.getTime() - b.value.getTime());
  });

  constructor(private prayerService: PrayerService) { }

  ngOnInit(): void {
    this.fetchAddress(this.latitude(), this.longitude());
  }

  fetchAddress(lat: number, lng: number) {
    this.prayerService.getAddress(lat, lng).subscribe({
      next: (response: OpenStreetMapResponse) => {
        this.address.set(response.display_name);
      },
      error: (error: OpenStreetMapErrorResponse) => {
        this.address.set(error.error.message);
      }
    });
  }
}
