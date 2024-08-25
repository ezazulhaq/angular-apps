import { Component, computed, input, Input, output } from '@angular/core';
import { PrayerService } from '../service/prayer.service';
import { CommonModule, DatePipe } from '@angular/common';
import type { NamazTimes } from '../model/namaz-time.model';

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

  getTimes = computed(() => this.prayerService.getPrayerTimes(this.latitude(), this.longitude()) ?? undefined);

  constructor(private prayerService: PrayerService) { }
}
