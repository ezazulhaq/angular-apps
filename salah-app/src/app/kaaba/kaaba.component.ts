import { TitleCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { SalahAppService } from '../service/salah-app.service';
import { Observable, fromEvent, map, throttleTime } from 'rxjs';

// Extended DeviceOrientationEvent interface to include webkitCompassHeading
interface ExtendedDeviceOrientationEvent extends DeviceOrientationEvent {
  webkitCompassHeading?: number;
}

@Component({
  selector: 'app-kaaba',
  standalone: true,
  imports: [
    TitleCasePipe
  ],
  templateUrl: './kaaba.component.html',
  styleUrl: './kaaba.component.css',
  host: {
    class: 'prayer-bg'
  }
})
export class KaabaComponent implements OnInit, OnDestroy {

  heading = signal<number>(0);
  kaabaDirection$: Observable<number | null>;
  compassDeg = signal<number>(0);

  private isIOS: boolean;

  kaabaSubscription: any;
  orientationSubscription: any;

  constructor(private kaabaService: SalahAppService) {
    this.kaabaDirection$ = this.kaabaService.getKaabaDirection();
    this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  ngOnInit() {
    this.requestOrientationPermission();
  }

  ngOnDestroy(): void {
    this.orientationSubscription?.unsubscribe();
    this.kaabaSubscription?.unsubscribe();
  }

  requestOrientationPermission() {
    if (this.isIOS) {
      if (typeof (window as any).DeviceOrientationEvent !== 'undefined' &&
        typeof (window as any).DeviceOrientationEvent.requestPermission === 'function') {
        (window as any).DeviceOrientationEvent.requestPermission()
          .then((permissionState: string) => {
            if (permissionState === 'granted') {
              this.setupDeviceOrientation();
            } else {
              console.error('Permission to access device orientation was denied');
            }
          })
          .catch(console.error);
      } else {
        console.error('DeviceOrientationEvent.requestPermission is not available');
      }
    } else {
      this.setupDeviceOrientation();
    }
  }

  setupDeviceOrientation() {
    if ('DeviceOrientationEvent' in window) {
      const orientationEvent$ = fromEvent<ExtendedDeviceOrientationEvent>(window, 'deviceorientation', { passive: true });

      this.orientationSubscription = orientationEvent$.pipe(
        throttleTime(100),
        map(event => {
          if (event.webkitCompassHeading !== undefined) {
            return event.webkitCompassHeading;
          } else if (event.alpha !== null) {
            return 360 - event.alpha;
          }
          return null;
        })
      ).subscribe({
        next: heading => this.heading.set(heading ?? 0),
        error: error => console.error('Error in orientation subscription:', error)
      });

      this.kaabaSubscription = this.kaabaDirection$.pipe(
        map(kaabaDirection => kaabaDirection ? ((kaabaDirection - this.heading() + 360) % 360) : 0)
      ).subscribe({
        next: relativeDirection => this.compassDeg.set(relativeDirection),
        error: error => console.error('Error in kaaba direction subscription:', error)
      });
    } else {
      console.error('Device orientation is not supported by this device.');
    }
  }

}
