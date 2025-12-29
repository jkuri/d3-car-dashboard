import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';

import { SpeedGaugeComponent } from '../speed-gauge/speed-gauge.component';
import { RpmGaugeComponent } from '../rpm-gauge/rpm-gauge.component';
import { InfoTopComponent } from '../info-top/info-top.component';
import { InfoMapComponent } from '../info-map/info-map.component';
import { InfoBottomComponent } from '../info-bottom/info-bottom.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    SpeedGaugeComponent,
    RpmGaugeComponent,
    InfoTopComponent,
    InfoMapComponent,
    InfoBottomComponent,
    MapComponent
  ],
  template: `
    <div class="flex w-full min-h-screen items-center justify-center overflow-hidden bg-black select-none" (touchstart)="startAccel($event)" (touchend)="stopAccel()">
      <div class="relative block w-350 min-w-350 h-125 z-99 origin-center" [style.transform]="'scale(' + scale() + ')'">
        <app-info-top class="block w-185 h-20 absolute left-82.5 top-0 z-10"></app-info-top>
        <app-map class="block w-300 h-75 absolute top-21.25 left-25 z-0 overflow-hidden" (locationFound)="onLocationFound($event)"></app-map>
        <app-info-map class="block w-115 h-55 absolute top-22.5 left-118.75 z-10" [address]="address()"></app-info-map>
        <app-info-bottom class="block w-115 h-50 absolute top-77.5 left-118.75 z-10"></app-info-bottom>
        <app-rpm-gauge [value]="rpm()" [gear]="gear()" class="block w-100 h-100 absolute left-20 top-20 z-20"></app-rpm-gauge>
        <app-speed-gauge [value]="speed()" class="block w-100 h-100 absolute top-20 right-17.5 z-20"></app-speed-gauge>
      </div>
    </div>
  `,
  standalone: true
})
export class DashboardComponent implements OnInit, OnDestroy {
  acc = signal(false);
  brake = signal(false);
  rpm = signal(0);
  speed = signal(0);
  gear = signal(1);
  scale = signal(1);
  address = signal('Locating...');

  private animationFrameId: number | null = null;
  private readonly gearMaxSpeeds = [100, 160, 210, 240, 260, 300];
  private readonly gearAccelRates = [0.4, 0.3, 0.2, 0.15, 0.1, 0.08];

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') {
      this.startAccel();
    } else if (event.key === 'ArrowDown') {
      this.startBrake();
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') {
      this.stopAccel();
    } else if (event.key === 'ArrowDown') {
      this.stopBrake();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateScale();
  }

  ngOnInit(): void {
    this.updateScale();
    this.loop();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  onLocationFound(coords: { lat: number, lng: number }): void {
    this.fetchAddress(coords.lat, coords.lng);
  }

  private async fetchAddress(lat: number, lng: number): Promise<void> {
    try {
      // Use OpenStreetMap Nominatim for reverse geocoding
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();

      if (data && data.address) {
        // Construct a nice address string
        const street = data.address.road || data.address.pedestrian || '';
        const number = data.address.house_number || '';
        const city = data.address.city || data.address.town || data.address.village || '';

        let formattedAddress = '';
        if (street) formattedAddress += street;
        if (number) formattedAddress += ` ${number}`;
        if (city) formattedAddress += `, ${city}`;

        if (!formattedAddress) {
          formattedAddress = data.display_name.split(',').slice(0, 2).join(',');
        }

        this.address.set(formattedAddress.trim());
      } else {
        this.address.set('Unknown Location');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      this.address.set('Address Unavailable');
    }
  }

  startAccel(e?: Event): void {
    if (e?.type === 'touchstart') {
      e.preventDefault();
    }
    this.acc.set(true);
    if (this.animationFrameId === null) {
      this.loop();
    }
  }

  stopAccel(): void {
    this.acc.set(false);
  }

  startBrake(): void {
    this.brake.set(true);
    if (this.animationFrameId === null) {
      this.loop();
    }
  }

  stopBrake(): void {
    this.brake.set(false);
  }

  private updateScale(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scale = Math.min((w - 20) / 1400, (h - 20) / 500);
    this.scale.set(scale);
  }

  private loop(): void {
    const currentSpeed = this.speed();
    const currentGear = this.gear();
    const maxSpeedForGear = this.gearMaxSpeeds[currentGear - 1];

    let newSpeed = currentSpeed;
    if (this.acc()) {
      const accelRate = this.gearAccelRates[currentGear - 1];
      newSpeed = Math.min(currentSpeed + accelRate, 300);
    } else if (this.brake()) {
      newSpeed = Math.max(currentSpeed - 0.7, 0);
    } else {
      const windDrag = 0.005 + (currentSpeed * 0.002);
      newSpeed = Math.max(currentSpeed - windDrag, 0);
    }

    let newRpm = (newSpeed / maxSpeedForGear) * 7000;

    let newGear = currentGear;

    if (newRpm >= 7000 && currentGear < 6) {
      newGear++;
    } else if (currentGear > 1) {
      const prevGearMax = this.gearMaxSpeeds[currentGear - 2];

      if (newSpeed < prevGearMax) {
        if (this.acc()) {
          if (newRpm < 3500) {
            newGear--;
          }
        } else if (this.brake()) {
          if (newRpm < 5000) {
            newGear--;
          }
        } else {
          if (newRpm < 2500) {
            newGear--;
          }
        }
      }
    }

    this.speed.set(newSpeed);
    this.gear.set(newGear);

    const finalMaxSpeed = this.gearMaxSpeeds[newGear - 1];
    const finalRpm = (newSpeed / finalMaxSpeed) * 7000;
    this.rpm.set(Math.min(finalRpm, 7000));

    if (this.acc() || this.brake() || this.speed() > 0 || this.rpm() > 0) {
      this.animationFrameId = requestAnimationFrame(() => this.loop());
    } else {
      this.animationFrameId = null;
    }
  }
}
