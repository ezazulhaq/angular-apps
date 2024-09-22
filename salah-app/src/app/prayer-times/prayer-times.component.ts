import { Component, computed, OnInit, signal } from '@angular/core';
import { SalahAppService } from '../service/salah-app.service';
import { CommonModule, DatePipe } from '@angular/common';
import { OpenStreetMapResponse } from '../model/open-stream-map.model';
import { NamazTimes } from '../model/namaz-time.model';
import { map } from 'rxjs/internal/operators/map';
import { shareReplay } from 'rxjs/internal/operators/shareReplay';
import { PrayerTimeInfo } from './prayer-times.model';

@Component({
  selector: 'app-prayer-times',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './prayer-times.component.html',
  styleUrl: './prayer-times.component.css',
  host: {
    class: "app-bg"
  }
})
export class PrayerTimesComponent implements OnInit {
  address = signal<string>("");

  selectedDate = signal<Date>(new Date());

  getTimes = computed(() => {
    return this.prayerService.getPrayerTimes(this.selectedDate())
      .pipe(
        map((namazTimes: NamazTimes | null) => {
          if (!namazTimes) return [];

          const now = new Date();
          const sortedTimes: PrayerTimeInfo[] = Object.entries(namazTimes)
            .map(([key, value]) => ({ key, value: new Date(value), isClosest: false }))
            .sort((a, b) => a.value.getTime() - b.value.getTime());

          // Find the closest future prayer time
          const closestFuturePrayer = sortedTimes.find(prayer => prayer.value > now && prayer.value.getDate() === now.getDate());
          if (closestFuturePrayer) {
            closestFuturePrayer.isClosest = true;
          }

          return sortedTimes;
        }),
        shareReplay(1) // Cache the result
      );
  });

  constructor(private prayerService: SalahAppService) { }

  ngOnInit(): void {
    this.fetchAddress();
  }

  fetchAddress() {
    this.prayerService.getAddress().subscribe({
      next: (response: OpenStreetMapResponse | null) => {
        response
          ? this.address.set(response.display_name)
          : this.address.set("");
      },
      error: (error: any) => {
        console.error('Error fetching address:', error);
        this.address.set('Error fetching address');
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
}

