import { h, Component } from 'preact';
import { select, arc, scaleLinear, line, range, easeCubicInOut } from 'd3';

export default class SpeedGauge extends Component {
  needle = null;
  speedText = null;

  componentDidMount() {
    this.generate();
  }

  componentWillUpdate() {
    this.setValue(this.props.value, 10);
  }

  generate() {
    const el = select('.speed-gauge');
    const svg = el.append('svg').attr('width', '100%').attr('height', '100%');
    const g = svg.append('g').attr('transform', `translate(200, 200)`);
    const colors = ['#D1D1D1', '#AFAFAF', '#FFFFFF', '#FD3104',  '#171717', '#0A0A0A'];
    const ticksData = [
      { value: 0, visible: false, color: '#FFFFFF' },
      { value: 20, visible: false, color: '#FFFFFF' },
      { value: 30, visible: false, color: '#FD3104' },
      { value: 40, visible: false, color: '#FFFFFF' },
      { value: 50, visible: false, color: '#FD3104' },
      { value: 60, visible: false, color: '#FFFFFF' },
      { value: 80, visible: false, color: '#FFFFFF' },
      { value: 100, visible: false, color: '#FFFFFF' },
      { value: 120, visible: false, color: '#FFFFFF' },
      { value: 140, visible: false, color: '#FFFFFF' },
      { value: 160, visible: false, color: '#FFFFFF' },
      { value: 180, visible: false, color: '#FFFFFF' },
      { value: 200, visible: false, color: '#FFFFFF' },
      { value: 220, visible: false, color: '#FFFFFF' },
      { value: 240, visible: false, color: '#FFFFFF' },
      { value: 260, visible: false, color: '#FFFFFF' },
      { value: 280, visible: false, color: '#FFFFFF' },
      { value: 300, visible: false, color: '#FFFFFF' }
    ];
    const r = 200; // width / 2

    // gradients
    const defs = svg.append('defs');

    const gradient = defs.append('linearGradient')
      .attr('id', 'gradient1')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '50%')
      .attr('y2', '100%');
    gradient.append('stop')
      .attr('offset', '50%')
      .attr('stop-color', colors[4])
      .attr('stop-opacity', 1);
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', colors[5])
      .attr('stop-opacity', 1);

    // outer circle
    const outerRadius = 200 - 10;
    const innerRadius = 0;

    const circle = arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    g.append('path')
      .attr('d', circle)
      .attr('fill', 'url(#gradient1)')
      .attr('stroke', colors[1])
      .attr('stroke-width', '7');

    // ticks
    const lg = svg.append('g').attr('class', 'label').attr('transform', `translate(${r}, ${r})`);
    const minAngle = -160;
    const maxAngle = 150;
    const angleRange = maxAngle - minAngle;

    const ticks = ticksData.reduce((acc, curr, i) => {
      if (curr.value === 0) {
        return [0, 1, 2, 3, 4, 5];
      } else {
        return acc.concat(range(curr.value - 10, curr.value + 10));
      }
    }, []).filter(d => d % 5 === 0 && d <= 300);

    lg.selectAll('line')
      .data(ticks)
      .enter().append('line')
      .attr('class', 'tickline')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', d => d % 20 === 0 || d === 0 ? '12' : '7')
      .attr('transform', d => {
        const ratio = this.scale(d);
        const newAngle = minAngle + (ratio * angleRange);
        const deviation = d % 20 === 0 || d === 0 ? 12 : 17;
        return `rotate(${newAngle}) translate(0, ${deviation - r})`;
      })
      .style('stroke', d => d === 30 || d === 50 ? colors[3] : colors[2])
      .style('stroke-width', d => d % 5 === 0 || d === 0 ? '3' : '1');

    // ticks text
    lg.selectAll('text')
      .data(ticksData)
      .enter().append('text')
      .attr('transform', d => {
        const ratio = this.scale(d.value);
        const newAngle = this.degToRad(minAngle + (ratio * angleRange));
        const deviation = d.value === 30 || d.value === 50 ? 45 : 50;
        const y = (deviation - r) * Math.cos(newAngle);
        const x = -1 * (deviation - r) * Math.sin(newAngle);
        return `translate(${x}, ${y + 7})`;
      })
      .text(d => d.value !== 0 ? d.value : '')
      .attr('fill', d => d.color)
      .attr('font-size', d => d.value === 30 || d.value === 50 ? '16' : '20')
      .attr('text-anchor', 'middle');

    // needle
    const pointerHeadLength = r * 0.88;
    const lineData  = [
      [ 0, -pointerHeadLength ],
      [ 0, 15 ],
    ];
    const needleLine = line();
    const ng = svg.append('g')
      .data([lineData])
      .attr('class', 'pointer')
      .attr('stroke', colors[3])
      .attr('stroke-width', '6')
      .attr('stroke-linecap', 'round')
      .attr('transform', `translate(${r}, ${r})`)
      .attr('z-index', '1');

    this.needle = ng.append('path')
      .attr('d', needleLine)
      .attr('transform', `rotate(${-160})`);

    // inner circle
    const tg = svg.append('g').attr('transform', `translate(${r}, ${r})`);

    const innerArcOuterRadius = r - 80;
    const innerArcInnerRadius = 0;

    const innerArc = arc()
      .innerRadius(innerArcInnerRadius)
      .outerRadius(innerArcOuterRadius)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    tg.append('path')
      .attr('d', innerArc)
      .attr('stroke', colors[0])
      .attr('stroke-width', '2')
      .attr('fill', 'url(#gradient1)')
      .attr('z-index', '10');

    // speed text in center
    this.speedText = tg.append('text')
      .text('0')
      .attr('font-size', '80')
      .attr('text-anchor', 'middle')
      .attr('fill', colors[2])
      .attr('x', '0')
      .attr('y', '10px')
      .style('position', 'absolute')
      .style('z-index', '10');

    // km/h text
    tg.append('text')
      .text('km/h')
      .attr('font-size', '16')
      .attr('text-anchor', 'middle')
      .attr('fill', colors[2])
      .attr('x', '0')
      .attr('y', '45px')
      .style('position', 'absolute')
      .style('z-index', '10');
  }

  degToRad(deg) {
    return deg * Math.PI / 180;
  }

  scale(value) {
    const s = scaleLinear().range([0, 1]).domain([0, 300]);
    return s(value);
  }

  setValue(value, duration) {
    const minAngle = -160;
    const maxAngle = 150;
    const angleRange = maxAngle - minAngle;
    const angle = minAngle + (this.scale(value) * angleRange);

    this.speedText.text(value);
    this.needle.transition()
      .duration(duration)
      .ease(easeCubicInOut)
      .attr('transform', `rotate(${angle})`);
  }

  render() {
    return (
      <div class="speed-gauge"></div>
    )
  }
}
