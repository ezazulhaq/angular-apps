import { Injectable } from '@angular/core';
import { Coordinates, PrayerTimes, CalculationMethod } from 'adhan';
import { NamazTimes } from '../model/namaz-time.model';
import { HttpClient } from '@angular/common/http';
import { OpenStreetMapErrorResponse, OpenStreetMapResponse } from '../model/open-stream-map.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PrayerService {

  constructor(private http: HttpClient) { }

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

  getAddress(lat: number, lng: number): Observable<OpenStreetMapResponse> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    return this.http.get<OpenStreetMapResponse>(url);
  }
}
