import { Injectable } from '@angular/core';
import { Coordinates, PrayerTimes, CalculationMethod } from 'adhan';
import { NamazTimes } from '../model/namaz-time.model';
import { HttpClient } from '@angular/common/http';
import { OpenStreetMapResponse } from '../model/open-stream-map.model';
import { Observable, BehaviorSubject, of, from } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalahAppService {
  private locationSubject = new BehaviorSubject<{ latitude: number, longitude: number } | null>(null);
  private errorSubject = new BehaviorSubject<string | null>(null);

  location$ = this.locationSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getLocation();
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          this.locationSubject.next(location);
          this.errorSubject.next(null);
        },
        (error) => {
          let errorMsg: string;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMsg = "Please enable location permissions for this site in your browser settings.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMsg = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMsg = "The request to get user location timed out.";
              break;
            default:
              errorMsg = "An unknown error occurred.";
              break;
          }
          this.errorSubject.next(errorMsg);
        }
      );
    } else {
      this.errorSubject.next("Geolocation is not supported by this browser.");
    }
  }

  getPrayerTimes(date: Date): Observable<NamazTimes | null> {
    return this.location$.pipe(
      map(location => {
        if (!location) return null;
        const coordinates = new Coordinates(location.latitude, location.longitude);
        const params = CalculationMethod.MuslimWorldLeague();
        const prayerTimes = new PrayerTimes(coordinates, date, params);
        return {
          fajr: prayerTimes.fajr,
          sunrise: prayerTimes.sunrise,
          dhuhr: prayerTimes.dhuhr,
          asr: prayerTimes.asr,
          maghrib: prayerTimes.maghrib,
          isha: prayerTimes.isha
        };
      })
    );
  }

  getAddress(): Observable<OpenStreetMapResponse | null> {
    return this.location$.pipe(
      switchMap(location => {
        if (!location) return of(null);
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}`;
        return this.http.get<OpenStreetMapResponse>(url);
      }),
      catchError(error => {
        console.error('Error fetching address:', error);
        return of(null);
      })
    );
  }
}