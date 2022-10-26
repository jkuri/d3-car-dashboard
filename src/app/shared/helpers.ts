import { scaleLinear } from 'd3';

export const degToRad = (deg: number): number => (deg * Math.PI) / 180;

export const scale = (value: number, to: number): number => {
  const sl = scaleLinear().range([0, 1]).domain([0, to]);
  return sl(value);
}
