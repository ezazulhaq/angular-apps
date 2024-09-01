import { Component, computed, input } from '@angular/core';
import { PrayerService } from '../service/prayer.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-salah-times',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './salah-times.component.html',
  styleUrl: './salah-times.component.css'
})
export class SalahTimesComponent {
  latitude = input.required<number>();
  longitude = input.required<number>();

  getTimes = computed(() => {
    const times = this.prayerService.getPrayerTimes(this.latitude(), this.longitude());
    if (!times) return null;

    return Object.entries(times)
      .map(([key, value]) => ({ key, value: new Date(value) }))
      .sort((a, b) => a.value.getTime() - b.value.getTime());
  });

  constructor(private prayerService: PrayerService) { }
}
