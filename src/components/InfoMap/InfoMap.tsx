import { select } from 'd3-selection';
import * as React from 'react';

export class InfoMap extends React.Component<{}, undefined> {
  public componentDidMount() {
    this.generate();
  }

  public render() {
    return (
      <div className='info-map'></div>
    );
  }

  private generate() {
    const el = select('.info-map');
    const svg = el.append('svg').attr('width', '100%').attr('height', '100%');
    const g = svg.append('g');

    // map text
    g.append('image')
      .attr('xlink:href', '/images/map-text.svg')
      .attr('x', '50px')
      .attr('y', '30px')
      .attr('width', '350px')
      .attr('height', '50px');

    // map marker
    g.append('image')
      .attr('xlink:href', '/images/map-marker.svg')
      .attr('x', '165px')
      .attr('y', '130px')
      .attr('width', '25px')
      .attr('height', '25px');
  }
}
