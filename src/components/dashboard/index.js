import { h, Component } from 'preact';
import { interval } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

import InfoTop from '../info-top';
import InfoBottom from '../info-bottom';
import InfoMap from '../info-map';
import RpmGauge from '../rpm-gauge';
import SpeedGauge from '../speed-gauge';
import map from '../../assets/images/map.png';

export default class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      rpm: 0,
      speed: 0,
      acc: false,
    };
    this.subscription = null;
  }

  handleKeyDown(e) {
    if (e.which === 38) { // up arrow key
      this.setState({ acc: true });
    }
  }

  handleKeyUp(e) {
    if (e.which === 38) {
      this.setState({ acc: false });
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this), false);
    document.addEventListener('keyup', this.handleKeyUp.bind(this), false);

    this.subscription = interval(10)
      .pipe(timeInterval())
      .subscribe(() => {
        if (this.state.acc) {
          if (this.state.speed < 300) {
            this.setState({ speed: this.state.speed += 1 });
          }
          if (this.state.rpm < 6000) {
            this.setState({ rpm: this.state.rpm += 50 });
          }
        } else {
          if (this.state.speed >= 0) {
            this.setState({ speed: this.state.speed -= 1 });
          }
          if (this.state.rpm >= 0) {
            this.setState({ rpm: this.state.rpm -= 50 });
          }
        }
      });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
    document.removeEventListener('keyup', this.handleKeyUp, false);

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  render() {
    return (
      <div class="dashboard">
        <div class="dashboard-body">
          <div class="container">
            <InfoTop />
            <img src={map} class="map" />
            <InfoMap />
            <InfoBottom />
            <RpmGauge value={this.state.rpm} />
            <SpeedGauge value={this.state.speed} />
          </div>
        </div>
      </div>
    )
  }
}
