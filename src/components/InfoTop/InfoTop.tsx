import { range } from 'd3-array';
import { select } from 'd3-selection';
import * as React from 'react';

export class InfoTop extends React.Component<{}, undefined> {
  public componentDidMount() {
    this.generate();
  }

  public render() {
    return (
      <div className='info-top'></div>
    );
  }

  private generate() {
    const el = select('.info-top');
    const svg = el.append('svg').attr('width', '100%').attr('height', '100%');
    const g = svg.append('g');

    // bottom line
    g.append('image')
      .attr('xlink:href', '/images/up_bottom_line.svg')
      .attr('x', '0')
      .attr('y', '30px')
      .attr('width', '740px')
      .attr('height', '50px');

    // progress line on top
    g.append('image')
      .attr('xlink:href', '/images/up_top_dots.svg')
      .attr('x', '30px')
      .attr('y', '5px')
      .attr('width', '680px')
      .attr('height', '30px');

    // left arrow
    g.append('image')
      .attr('xlink:href', '/images/left-arrow.svg')
      .attr('x', '80px')
      .attr('y', '35px')
      .attr('width', '30px')
      .attr('height', '30px');

    // right arrow
    g.append('image')
      .attr('xlink:href', '/images/right-arrow.svg')
      .attr('x', '630px')
      .attr('y', '35px')
      .attr('width', '30px')
      .attr('height', '30px');

    // gasoline pump
    g.append('image')
      .attr('xlink:href', '/images/gasoline-pump.svg')
      .attr('x', '130px')
      .attr('y', '37px')
      .attr('width', '25px')
      .attr('height', '25px');

    // kilometers remaining text
    g.append('text')
      .text('130 km')
      .attr('font-size', '16')
      .attr('text-anchor', 'middle')
      .attr('fill', '#FFFFFF')
      .attr('x', '195px')
      .attr('y', '55px')
      .style('position', 'absolute');

    // red line
    g.append('image')
      .attr('xlink:href', '/images/red-line.svg')
      .attr('x', '235px')
      .attr('y', '35px')
      .attr('width', '25px')
      .attr('height', '25px');

    // circles LTE signal
    let x = 280;
    range(5).forEach(() => {
      g.append('circle')
        .attr('cx', x)
        .attr('cy', '48px')
        .attr('r', '3')
        .attr('fill', '#FFFFFF')
        .style('position', 'absolute');
      x += 10;
    });

    // LTE signal text
    g.append('text')
      .text('LTE')
      .attr('font-size', '14')
      .attr('text-anchor', 'middle')
      .attr('fill', '#FFFFFF')
      .attr('x', '347px')
      .attr('y', '53px')
      .style('position', 'absolute');

    // location image
    g.append('image')
      .attr('xlink:href', '/images/location.svg')
      .attr('x', '380px')
      .attr('y', '42px')
      .attr('width', '15px')
      .attr('height', '15px');

    // bluetooth image
    g.append('image')
      .attr('xlink:href', '/images/bluetooth.svg')
      .attr('x', '400px')
      .attr('y', '40px')
      .attr('width', '18px')
      .attr('height', '18px');

    // battery text
    g.append('text')
      .text('46%')
      .attr('font-size', '14')
      .attr('text-anchor', 'middle')
      .attr('fill', '#FFFFFF')
      .attr('x', '450px')
      .attr('y', '54px')
      .style('position', 'absolute');

    // bluetooth image
    g.append('image')
      .attr('xlink:href', '/images/battery.svg')
      .attr('x', '470px')
      .attr('y', '34px')
      .attr('width', '30px')
      .attr('height', '30px');

    // red line
    g.append('image')
      .attr('xlink:href', '/images/red-line.svg')
      .attr('x', '520px')
      .attr('y', '35px')
      .attr('width', '25px')
      .attr('height', '25px');

    // temperature text
    g.append('text')
      .html('-12 &deg;C')
      .attr('font-size', '14')
      .attr('text-anchor', 'middle')
      .attr('fill', '#FFFFFF')
      .attr('x', '580px')
      .attr('y', '54px')
      .style('position', 'absolute');
  }
}
