import { h, Component } from 'preact';
import { select } from 'd3';

import mapText from '../../assets/images/map-text.svg';
import mapMarker from '../../assets/images/map-marker.svg';

export default class InfoMap extends Component {
  componentDidMount() {
    this.generate();
  }

  generate() {
    const el = select('.info-map');
    const svg = el.append('svg').attr('width', '100%').attr('height', '100%');
    const g = svg.append('g');

    // map text
    g.append('image')
      .attr('xlink:href', mapText)
      .attr('x', '50px')
      .attr('y', '30px')
      .attr('width', '350px')
      .attr('height', '50px');

    // map marker
    g.append('image')
      .attr('xlink:href', mapMarker)
      .attr('x', '165px')
      .attr('y', '130px')
      .attr('width', '25px')
      .attr('height', '25px');
  }

  render() {
    return (
      <div class="info-map"></div>
    )
  }
}
