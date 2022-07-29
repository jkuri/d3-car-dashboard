import { Component, ElementRef, OnInit } from '@angular/core';
import { select } from 'd3';

@Component({
  selector: 'app-info-bottom',
  template: `<div class="info-bottom"></div>`
})
export class InfoBottomComponent implements OnInit {
  constructor(private readonly elementRef: ElementRef) { }

  ngOnInit(): void {
    this.generate();
  }

  private generate(): void {
    const el = this.elementRef.nativeElement.querySelector('.info-bottom');
    const svg = select(el).append('svg').attr('width', '100%').attr('height', '100%');
    const g = svg.append('g');

    // trip km text
    g.append('text')
      .text('Trip: 478.0km')
      .attr('x', '90px')
      .attr('y', '40px')
      .attr('font-size', '18')
      .attr('text-anchor', 'middle')
      .attr('fill', '#FFFFFF');

    // red line
    g.append('image')
      .attr('xlink:href', '/assets/images/red-line.svg')
      .attr('x', '160px')
      .attr('y', '22px')
      .attr('width', '25px')
      .attr('height', '25px');

    // hour
    g.append('text')
      .text('10:16am')
      .attr('x', '230px')
      .attr('y', '40px')
      .attr('font-size', '18')
      .attr('text-anchor', 'middle')
      .attr('fill', '#FFFFFF');

    // red line
    g.append('image')
      .attr('xlink:href', '/assets/images/red-line.svg')
      .attr('x', '280px')
      .attr('y', '22px')
      .attr('width', '25px')
      .attr('height', '25px');

    // mileage
    g.append('text')
      .text('21341km')
      .attr('x', '370px')
      .attr('y', '40px')
      .attr('font-size', '18')
      .attr('text-anchor', 'middle')
      .attr('fill', '#FFFFFF');

    // white line
    g.append('image')
      .attr('xlink:href', '/assets/images/white-line.svg')
      .attr('x', '65px')
      .attr('y', '70px')
      .attr('width', '320px')
      .attr('height', '10px');

    // iPhone text
    g.append('text')
      .text('iPhone')
      .attr('x', '120px')
      .attr('y', '100px')
      .attr('font-size', '16')
      .attr('text-anchor', 'middle')
      .attr('fill', '#FFFFFF');

    // musical note
    g.append('image')
      .attr('xlink:href', '/assets/images/musical-note.svg')
      .attr('x', '170px')
      .attr('y', '80px')
      .attr('width', '25px')
      .attr('height', '25px');

    // Song text
    g.append('text')
      .text('Wu-Tang Clan - Triumph')
      .attr('x', '285px')
      .attr('y', '97px')
      .attr('font-size', '12')
      .attr('text-anchor', 'middle')
      .attr('fill', '#FFFFFF');
  }
}
