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

  selectedDate = signal<Date>(new Date());

  getTimes = computed(() => {
    const times = this.prayerService.getPrayerTimes(this.latitude(), this.longitude(), this.selectedDate());
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

  changeSelectedDate(value: string) {
    const newDate = new Date(this.selectedDate());
    if (value === "next")
      newDate.setDate(newDate.getDate() + 1);
    else
      newDate.setDate(newDate.getDate() - 1);
    this.selectedDate.set(newDate);
  }

  isClosestToCurrentTime(prayer: { key: string; value: Date; }): boolean {
    const now = new Date();
    const prayerTime = new Date(prayer.value);
    // 1. Consider only future prayer times
    if (prayerTime < now) {
      return false;
    }

    const times = this.getTimes(); // Use getTimes() here
    if (!times) return false; // Handle null case

    // 2. Calculate time differences
    const timeDiffs = times.map(p => {
      const pTime = new Date(p.value);
      return { prayer: p, diff: pTime > now ? pTime.getTime() - now.getTime() : Infinity };
    });

    // 3. Find the closest
    const closest = timeDiffs.reduce((prev, curr) => (prev.diff < curr.diff) ? prev : curr);

    // 4. Return true if the input prayer is the closest
    return closest.prayer === prayer;
  }
}
