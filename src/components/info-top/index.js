import { h, Component } from 'preact';
import { select, range } from 'd3';

import upBottomLine from '../../assets/images/up_bottom_line.svg';
import upTopDots from '../../assets/images/up_top_dots.svg';
import leftArrow from '../../assets/images/left-arrow.svg';
import leftArrowGreen from '../../assets/images/left-arrow-green.svg';
import rightArrow from '../../assets/images/right-arrow.svg';
import rightArrowGreen from '../../assets/images/right-arrow-green.svg';
import gasolinePump from '../../assets/images/gasoline-pump.svg';
import redLine from '../../assets/images/red-line.svg';
import location from '../../assets/images/location.svg';
import bluetooth from '../../assets/images/bluetooth.svg';
import battery from '../../assets/images/battery.svg';

export default class InfoTop extends Component {
  componentDidMount() {
    this.generate();
  }

  generate() {
    const el = select('.info-top');
    const svg = el.append('svg').attr('width', '100%').attr('height', '100%');
    const g = svg.append('g');

    // bottom line
    g.append('image')
      .attr('xlink:href', upBottomLine)
      .attr('x', '0')
      .attr('y', '30px')
      .attr('width', '740px')
      .attr('height', '50px');

    // progress line on top
    g.append('image')
      .attr('xlink:href', upTopDots)
      .attr('x', '30px')
      .attr('y', '5px')
      .attr('width', '680px')
      .attr('height', '30px');

    // left arrow
    g.append('image')
      .attr('xlink:href', leftArrow)
      .attr('x', '80px')
      .attr('y', '35px')
      .attr('width', '30px')
      .attr('height', '30px');

    // right arrow
    g.append('image')
      .attr('xlink:href', rightArrow)
      .attr('x', '630px')
      .attr('y', '35px')
      .attr('width', '30px')
      .attr('height', '30px');

    // gasoline pump
    g.append('image')
      .attr('xlink:href', gasolinePump)
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
      .attr('xlink:href', redLine)
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
      .attr('xlink:href', location)
      .attr('x', '380px')
      .attr('y', '42px')
      .attr('width', '15px')
      .attr('height', '15px');

    // bluetooth image
    g.append('image')
      .attr('xlink:href', bluetooth)
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
      .attr('xlink:href', battery)
      .attr('x', '470px')
      .attr('y', '34px')
      .attr('width', '30px')
      .attr('height', '30px');

    // red line
    g.append('image')
      .attr('xlink:href', redLine)
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

  render() {
    return (
      <div class="info-top"></div>
    )
  }
}
