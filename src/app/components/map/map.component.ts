import { Component, ElementRef, AfterViewInit, OnDestroy, ViewEncapsulation, output } from '@angular/core';
import maplibregl from 'maplibre-gl';

@Component({
  selector: 'app-map',
  template: `
    <div class="map-wrapper">
      <div id="map-root"></div>
      <!-- SVG Overlay for the octagonal border -->
      <svg class="map-border" viewBox="0 0 1200 300" preserveAspectRatio="none">
        <path d="M 320 0
                 L 890 0
                 L 1155 125
                 L 1155 300
                 L 963 300
                 L 805 225
                 L 405 225
                 L 247 300
                 L 55 300
                 L 55 125
                 Z"
              fill="none"
              stroke="#AFAFAF"
              stroke-width="7"
              vector-effect="non-scaling-stroke"/>
      </svg>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 1200px;
      height: 300px;
      position: relative;
    }

    .map-wrapper {
      width: 100%;
      height: 100%;
      position: relative;
      background: #000;
      transform: translateZ(0);

      clip-path: polygon(
        320px 0px,
        890px 0px,
        1155px 125px,
        1155px 300px,
        963px 300px,
        805px 225px,
        405px 225px,
        247px 300px,
        55px 300px,
        55px 125px
      );
      -webkit-clip-path: polygon(
        320px 0px,
        890px 0px,
        1155px 125px,
        1155px 300px,
        963px 300px,
        805px 225px,
        405px 225px,
        247px 300px,
        55px 300px,
        55px 125px
      );
    }

    #map-root {
      width: 100%;
      height: 100%;
      background: #000;
    }

    .map-border {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 10;
    }

    .maplibregl-map {
      width: 100% !important;
      height: 100% !important;
      overflow: hidden !important;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  standalone: true
})
export class MapComponent implements AfterViewInit, OnDestroy {
  locationFound = output<{ lat: number, lng: number }>();
  private map: maplibregl.Map | undefined;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    setTimeout(() => this.initMap(), 50);
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private initMap(): void {
    const container = this.elementRef.nativeElement.querySelector('#map-root');
    if (!container) return;

    this.map = new maplibregl.Map({
      container: container,
      style: {
        version: 8,
        sources: {
          'carto-light': {
            type: 'raster',
            tiles: [
              'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
              'https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
              'https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
              'https://d.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png'
            ],
            tileSize: 256
          }
        },
        layers: [
          {
            id: 'carto-light-layer',
            type: 'raster',
            source: 'carto-light',
            minzoom: 0,
            maxzoom: 22
          }
        ]
      },
      center: [8.5417, 47.3769],
      zoom: 14,
      interactive: false,
      attributionControl: false
    });

    this.map.on('load', () => {
      this.map?.resize();
    });

    const setLocation = (lat: number, lng: number) => {
      const map = this.map;
      if (map) {
        map.setCenter([lng, lat]);

        this.locationFound.emit({ lat, lng });

        const el = document.createElement('div');
        el.style.width = '14px';
        el.style.height = '14px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = '#3388ff';
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 0 15px rgba(51, 136, 255, 0.9)';

        new maplibregl.Marker({ element: el })
          .setLngLat([lng, lat])
          .addTo(map);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Fallback to Munich (Marienplatz)
          setLocation(48.137154, 11.576124);
        }
      );
    } else {
      // Fallback to Munich (Marienplatz)
      setLocation(48.137154, 11.576124);
    }
  }
}
