import * as React from 'react';
import { fromEvent, interval, Subscription } from 'rxjs';
import { filter, timeInterval } from 'rxjs/operators';

import { InfoBottom } from '../InfoBottom/InfoBottom';
import { InfoMap } from '../InfoMap/InfoMap';
import { InfoTop } from '../InfoTop/InfoTop';
import { RpmGauge } from '../RpmGauge/RpmGauge';
import { SpeedGauge } from '../SpeedGauge/SpeedGauge';

interface IDashboardState {
  acc: boolean;
  rpm: number;
  speed: number;
}

export class Dashboard extends React.Component<{}, IDashboardState> {
  private subs: Subscription;

  constructor(props: {}) {
    super(props);

    this.state = {
      acc: false,
      rpm: 0,
      speed: 0
    };
  }

  public componentDidMount() {
    this.subs = new Subscription();

    const keyDown = fromEvent(document, 'keydown')
      .pipe(filter((e: KeyboardEvent) => e.which === 38))
      .subscribe(() => this.setState({ acc: true }));

    const keyUp = fromEvent(document, 'keyup')
      .pipe(filter((e: KeyboardEvent) => e.which === 38))
      .subscribe(() => this.setState({ acc: false }));

    const keyInterval = interval(10)
      .pipe(timeInterval())
      .subscribe(() => {
        if (this.state.acc) {
          if (this.state.speed < 300) {
            this.setState({ speed: this.state.speed + 1 });
          }
          if (this.state.rpm < 6000) {
            this.setState({ rpm: this.state.rpm + 50 });
          }
        } else {
          if (this.state.speed > 0) {
            this.setState({ speed: this.state.speed - 1 });
          }
          if (this.state.rpm > 0) {
            this.setState({ rpm: this.state.rpm - 50 });
          }
        }
      });

    this.subs.add(keyDown).add(keyUp).add(keyInterval);
  }

  public componentWillUnmount() {
    this.subs.unsubscribe();
  }

  public render() {
    return (
      <div className="dashboard">
        <div className="dashboard-body">
          <div className="container">
            <InfoTop />
            <img src="/images/map.png" className="map" />
            <InfoMap />
            <InfoBottom />
            <RpmGauge value={this.state.rpm} />
            <SpeedGauge value={this.state.speed} />
          </div>
        </div>
      </div>
    );
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (e.which === 38) {
      this.setState({ acc: true });
    }
  }

  private handleKeyUp(e: KeyboardEvent): void {
    if (e.which === 38) {
      this.setState({ acc: false });
    }
  }
}
