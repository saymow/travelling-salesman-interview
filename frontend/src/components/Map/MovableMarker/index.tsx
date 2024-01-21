import { Marker } from "react-leaflet";
import { useMapEvents } from "react-leaflet";
import { LatLngTuple } from "../helpers";

export interface Props {
  position: LatLngTuple;
  onMove: (position: LatLngTuple) => void;
}

const MovableMarker: React.FC<Props> = (props) => {
  const { position, onMove } = props;
  useMapEvents({
    click: function (event) {
      onMove([event.latlng.lat, event.latlng.lng]);
    },
  });

  return <Marker position={position}></Marker>;
};

export default MovableMarker;
