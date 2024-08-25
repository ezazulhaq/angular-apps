import { Injectable } from '@angular/core';
import { Coordinates, PrayerTimes, CalculationMethod } from 'adhan';
import { NamazTimes } from '../model/namaz-time.model';

@Injectable({
  providedIn: 'root'
})
export class PrayerService {

  constructor() { }

  public getPrayerTimes(latitude: number, longitude: number): NamazTimes {
    const coordinates = new Coordinates(latitude, longitude);
    const params = CalculationMethod.MuslimWorldLeague();
    const date = new Date();
    const prayerTimes = new PrayerTimes(coordinates, date, params);

    return {
      fajr: prayerTimes.fajr,
      sunrise: prayerTimes.sunrise,
      dhuhr: prayerTimes.dhuhr,
      asr: prayerTimes.asr,
      maghrib: prayerTimes.maghrib,
      isha: prayerTimes.isha
    };
  }
}
