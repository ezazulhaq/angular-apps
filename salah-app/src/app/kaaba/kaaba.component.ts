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
    class: 'app-bg'
  }
})
export class KaabaComponent implements OnInit, OnDestroy {

  heading$: BehaviorSubject<number>;
  kaabaDirection$: Observable<number | null>;
  private compassSubscription: Subscription | null = null;
  compassDeg = signal<number>(0);

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
            this.compassDeg.set(relativeDirection);
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

}
