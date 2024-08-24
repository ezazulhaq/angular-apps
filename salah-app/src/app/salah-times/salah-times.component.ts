import { Component, computed, input, Input } from '@angular/core';
import { PrayerService } from '../service/prayer.service';

@Component({
  selector: 'app-salah-times',
  standalone: true,
  imports: [],
  templateUrl: './salah-times.component.html',
  styleUrl: './salah-times.component.css'
})
export class SalahTimesComponent {
  latitude = input<number>();
  longitude = input<number>();

  constructor(private prayerService: PrayerService) { }

  prayerTimes = computed(() -> prayerService.getPrayerTimes(this.latitude(), this.longitude()), { default: null });

}
