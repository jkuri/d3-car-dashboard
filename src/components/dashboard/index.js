import { h, Component } from 'preact';

import InfoTop from '../info-top';
import InfoBottom from '../info-bottom';
import InfoMap from '../info-map';
import RpmGauge from '../rpm-gauge';
import SpeedGauge from '../speed-gauge';
import map from '../../assets/images/map.png';

export default class Dashboard extends Component {
  state = {
    rpm: 0,
    speed: 0
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
            <RpmGauge />
            <SpeedGauge />
          </div>
        </div>
      </div>
    )
  }
}
