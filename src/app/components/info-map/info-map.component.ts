import { Component, ElementRef, OnInit } from '@angular/core';
import { select } from 'd3';

@Component({
  selector: 'app-info-map',
  template: `<div class="info-map"></div>`
})
export class InfoMapComponent implements OnInit {
  constructor(private readonly elementRef: ElementRef) { }

  ngOnInit(): void {
    this.generate();
  }

  private generate(): void {
    const el = this.elementRef.nativeElement.querySelector('.info-map');
    const svg = select(el).append('svg').attr('width', '100%').attr('height', '100%');
    const g = svg.append('g');

    // map text
    g.append('image')
      .attr('xlink:href', '/assets/images/map-text.svg')
      .attr('x', '50px')
      .attr('y', '30px')
      .attr('width', '350px')
      .attr('height', '50px');

    // map marker
    g.append('image')
      .attr('xlink:href', '/assets/images/map-marker.svg')
      .attr('x', '165px')
      .attr('y', '130px')
      .attr('width', '25px')
      .attr('height', '25px');
  }
}
