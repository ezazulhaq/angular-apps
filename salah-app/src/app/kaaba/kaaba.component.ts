import { TitleCasePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { SalahAppService } from '../service/salah-app.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

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
export class KaabaComponent implements OnInit {

  heading = signal<number>(0);
  kaabaDirection$: Observable<number | null>;
  compassDeg = signal<number>(0);

  private isIOS: boolean;

  constructor(private kaabaService: SalahAppService) {
    this.kaabaDirection$ = this.kaabaService.getKaabaDirection();
    this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  ngOnInit() {
    this.requestOrientationPermission();
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
      const handleOrientation = (event: ExtendedDeviceOrientationEvent) => {
        if (event.webkitCompassHeading !== undefined) {
          // For iOS devices
          this.heading.set(event.webkitCompassHeading);
        } else if (event.alpha !== null) {
          // For Android devices
          this.heading.set(360 - event.alpha);
        }
      };

      window.addEventListener('deviceorientation', handleOrientation as EventListener, true);

      this.kaabaDirection$
        .pipe(
          map(kaabaDirection => kaabaDirection ? ((kaabaDirection - this.heading() + 360) % 360) : 0)
        )
        .subscribe(
          {
            next: relativeDirection => {
              relativeDirection ? this.compassDeg.set(relativeDirection) : 0;
            },
            error: error => console.error('Error in compassSubscription:', error)
          }
        );
    } else {
      console.error('Device orientation is not supported by this device.');
    }
  }

}
