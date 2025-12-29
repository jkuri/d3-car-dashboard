import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';

import { SpeedGaugeComponent } from '../speed-gauge/speed-gauge.component';
import { RpmGaugeComponent } from '../rpm-gauge/rpm-gauge.component';
import { InfoTopComponent } from '../info-top/info-top.component';
import { InfoMapComponent } from '../info-map/info-map.component';
import { InfoBottomComponent } from '../info-bottom/info-bottom.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    SpeedGaugeComponent,
    RpmGaugeComponent,
    InfoTopComponent,
    InfoMapComponent,
    InfoBottomComponent
  ],
  template: `
    <div class="flex w-full min-h-screen items-center justify-center overflow-hidden bg-black select-none"
         (mousedown)="startAccel($event)" (touchstart)="startAccel($event)"
         (mouseup)="stopAccel()" (touchend)="stopAccel()"
         (mouseleave)="stopAccel()">
      <div class="relative block w-[1400px] min-w-[1400px] h-[500px] z-[99] origin-center"
           [style.transform]="'scale(' + scale() + ')'">
        <app-info-top class="block w-[740px] h-20 absolute left-[330px] top-0 z-10"></app-info-top>
        <img src="/assets/images/map.png" class="block w-[1200px] h-[300px] absolute top-[85px] left-[100px] z-0" />
        <app-info-map class="block w-[460px] h-[220px] absolute top-[90px] left-[475px] z-10"></app-info-map>
        <app-info-bottom class="block w-[460px] h-[200px] absolute top-[310px] left-[475px] z-10"></app-info-bottom>
        <app-rpm-gauge [value]="rpm()" [gear]="gear()" class="block w-[400px] h-[400px] absolute left-20 top-20 z-20"></app-rpm-gauge>
        <app-speed-gauge [value]="speed()" class="block w-[400px] h-[400px] absolute top-20 right-[70px] z-20"></app-speed-gauge>
      </div>
    </div>
  `,
  standalone: true
})
export class DashboardComponent implements OnInit, OnDestroy {
  acc = signal(false);
  rpm = signal(0);
  speed = signal(0);
  gear = signal(1);
  scale = signal(1);

  private animationFrameId: number | null = null;
  // Max speeds for each gear (1-6) at 7000 RPM
  private readonly gearMaxSpeeds = [50, 90, 140, 190, 240, 300];
  // Acceleration rates (km/h per frame) for each gear - realistic torque curve
  private readonly gearAccelRates = [1.2, 0.9, 0.6, 0.45, 0.3, 0.15];

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') {
      this.startAccel();
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') {
      this.stopAccel();
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
    } else {
      newSpeed = Math.max(currentSpeed - 0.5, 0);
    }

    // Theoretical RPM at this speed with current gear
    let newRpm = (newSpeed / maxSpeedForGear) * 7000;

    let newGear = currentGear;

    // Automatic Gearbox Logic
    if (newRpm >= 7000 && currentGear < 6) {
      // Shift Up
      newGear++;
    } else if (newRpm < 2500 && currentGear > 1 && !this.acc()) {
      // Shift Down if decelerating and low RPM
      const prevGearMax = this.gearMaxSpeeds[currentGear - 2];
      // Ensure we don't over-rev below
      if (newSpeed < prevGearMax) {
        newGear--;
      }
    }

    this.speed.set(newSpeed);
    this.gear.set(newGear);

    // Recalc RPM for display
    const finalMaxSpeed = this.gearMaxSpeeds[newGear - 1];
    const finalRpm = (newSpeed / finalMaxSpeed) * 7000;
    this.rpm.set(Math.min(finalRpm, 7000));

    if (this.acc() || this.speed() > 0 || this.rpm() > 0) {
      this.animationFrameId = requestAnimationFrame(() => this.loop());
    } else {
      this.animationFrameId = null;
    }
  }
}
