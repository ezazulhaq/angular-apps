import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { SalahAppService } from '../service/salah-app.service';
import { BehaviorSubject, Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// Extended DeviceOrientationEvent interface to include webkitCompassHeading
interface ExtendedDeviceOrientationEvent extends DeviceOrientationEvent {
  webkitCompassHeading?: number;
}

@Component({
  selector: 'app-kaaba',
  standalone: true,
  imports: [
    TitleCasePipe,
    AsyncPipe
  ],
  templateUrl: './kaaba.component.html',
  styleUrl: './kaaba.component.css',
  host: {
    class: 'prayer-bg'
  }
})
export class KaabaComponent implements OnInit, OnDestroy {

  heading$: BehaviorSubject<number>;
  kaabaDirection$: Observable<number | null>;
  private compassSubscription: Subscription | null = null;

  compassSvg: SafeHtml = '';
  private isIOS: boolean;

  constructor(private kaabaService: SalahAppService, private sanitizer: DomSanitizer) {
    this.heading$ = new BehaviorSubject<number>(0);
    this.kaabaDirection$ = this.kaabaService.getKaabaDirection();
    this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  ngOnInit() {
    this.requestOrientationPermission();
  }

  ngOnDestroy() {
    if (this.compassSubscription) {
      this.compassSubscription.unsubscribe();
    }
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
          this.heading$.next(event.webkitCompassHeading);
        } else if (event.alpha !== null) {
          // For Android devices
          this.heading$.next(360 - event.alpha);
        }
      };

      window.addEventListener('deviceorientation', handleOrientation as EventListener, true);

      this.compassSubscription = combineLatest([this.heading$, this.kaabaDirection$])
        .pipe(
          map(([heading, kaabaDirection]) => {
            if (kaabaDirection !== null) {
              return (kaabaDirection - heading + 360) % 360;
            }
            return 0;
          })
        )
        .subscribe(relativeDirection => {
          if (relativeDirection !== null) {
            this.updateCompassSvg(relativeDirection);
            const compassElement = document.querySelector('.compass') as HTMLElement;
            if (compassElement) {
              compassElement.style.transform = `rotate(${relativeDirection}deg)`;
            }
          }
        });
    } else {
      console.error('Device orientation is not supported by this device.');
    }
  }

  getDirection(degrees: number): string {
    const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }

  updateCompassSvg(degrees: number) {
    const compassSize = 200;
    const arrowSize = 120;

    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${compassSize}" height="${compassSize}" viewBox="0 0 ${compassSize} ${compassSize}">
        <circle cx="${compassSize / 2}" cy="${compassSize / 2}" r="${compassSize / 2 - 5}" fill="none" stroke="white" stroke-width="2" />
        <text x="${compassSize / 2}" y="26" text-anchor="middle" class="text-xl text-gray-200 font-semibold" fill="currentColor">
          N
        </text>
        <text x="${compassSize / 2}" y="${compassSize - 14}" text-anchor="middle" class="text-xl text-gray-200 font-semibold" fill="currentColor">
          S
        </text>
        <text x="${compassSize - 16}" y="${compassSize / 2}" text-anchor="middle" dominant-baseline="middle" class="text-xl text-gray-200 font-semibold" fill="currentColor">
          E
        </text>
        <text x="20" y="${compassSize / 2}" text-anchor="middle" dominant-baseline="middle" class="text-xl text-gray-200 font-semibold" fill="currentColor">
          W
        </text>
        <polygon points="${compassSize / 2},${(compassSize - arrowSize) / 2} ${compassSize / 2 - 8},${(compassSize + arrowSize) / 2} ${compassSize / 2 + 8},${(compassSize + arrowSize) / 2}"
              class="text-red-600" fill="currentColor" transform="rotate(${degrees}, ${compassSize / 2}, ${compassSize / 2})" />
      </svg>
    `;

    console.log(svgString);

    this.compassSvg = this.sanitizer.bypassSecurityTrustHtml(svgString);

  }

}
