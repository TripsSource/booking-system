import { onlineMapState } from "../app/product";

export interface WorldMapProps {
  checkPlace: boolean;
  onlineMap: { usaPosition: [number, number]; locations: [number, number][] };
  handleProduct?: (param: string, value: onlineMapState) => void;
}
