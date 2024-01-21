import "leaflet/dist/leaflet.css";
import {
  MapContainer as LeafLetMapContainer,
  Polyline,
  TileLayer,
} from "react-leaflet";
import Marker, { Props as MarkerProps } from "./Marker";
import MovableMarker, { Props as MovableMarkerProps } from "./MovableMarker";
import { ORIGIN } from "./helpers";
import { LatLngTuple } from "leaflet";
import Legend from "./Legend";

interface MovableMarkerType extends MovableMarkerProps {
  type: "MOVABLE";
}

interface MarkerType extends MarkerProps {
  type: "STATIC";
}

export type Marker = MovableMarkerType | MarkerType;

export interface Polyline {
  color?: string;
  position: [LatLngTuple, LatLngTuple];
}

interface Props {
  height: number;
  markers?: Marker[];
  polylines?: Polyline[];
  legend?: React.ReactNode;
}

const positionToKey = (position: LatLngTuple) => {
  const [lat, lng] = position;
  return `${lat}:${lng}`;
};

const MapContainer: React.FC<Props> = (props) => {
  const { height, markers, polylines, legend } = props;

  return (
    <LeafLetMapContainer
      style={{ height }}
      center={ORIGIN}
      zoom={3}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers?.map((marker) =>
        marker.type === "MOVABLE" ? (
          <MovableMarker
            key={positionToKey(marker.position)}
            position={marker.position}
            onMove={marker.onMove}
          />
        ) : (
          <Marker
            key={positionToKey(marker.position)}
            position={marker.position}
            text={marker.text}
            color={marker.color}
          />
        )
      )}
      {polylines?.map((polyline) => (
        <Polyline
          key={positionToKey(polyline.position[0])}
          color={polyline.color}
          positions={polyline.position}
        />
      ))}
      {legend && <Legend>{legend}</Legend>}
    </LeafLetMapContainer>
  );
};

export default MapContainer;
