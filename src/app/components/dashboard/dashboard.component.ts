import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, fromEvent, interval, Subscription, tap, timeInterval } from 'rxjs';
import { DEFAULT_REFRESH_RATE } from '../../shared/const';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <div class="dashboard-body">
        <div class="container">
          <app-info-top></app-info-top>
          <img src="/assets/images/map.png" class="map" />
          <app-info-map></app-info-map>
          <app-info-bottom></app-info-bottom>
          <app-rpm-gauge [value]="rpm"></app-rpm-gauge>
          <app-speed-gauge [value]="speed"></app-speed-gauge>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit, OnDestroy {
  sub = new Subscription();
  acc = false;
  rpm = 0;
  speed = 0;

  constructor() { }

  ngOnInit(): void {
    const keyDown$ = fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(
        filter((e: KeyboardEvent) => e.key === 'ArrowUp'),
        tap(() => this.acc = true)
      );

    const keyUp$ = fromEvent<KeyboardEvent>(document, 'keyup')
      .pipe(
        filter((e: KeyboardEvent) => e.key === 'ArrowUp'),
        tap(() => this.acc = false)
      );

    const interval$ = interval(DEFAULT_REFRESH_RATE)
      .pipe(
        timeInterval(),
        tap(() => {
          if (this.acc) {
            this.speed = this.speed < 300 ? this.speed += 1 : this.speed;
            this.rpm = this.rpm < 6000 ? this.rpm += 50 : this.rpm;
          } else {
            this.speed = this.speed > 0 ? this.speed -= 1 : this.speed;
            this.rpm = this.rpm > 0 ? this.rpm -= 50 : this.rpm;
          }
        })
      );

    this.sub.add(keyDown$.subscribe());
    this.sub.add(keyUp$.subscribe());
    this.sub.add(interval$.subscribe());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
