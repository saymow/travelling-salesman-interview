import { Marker, Popup } from "react-leaflet";
import { useMapEvents } from "react-leaflet";
import { LatLngTuple } from "../helpers";

interface Props {
  positon: LatLngTuple;
  onMove: (position: LatLngTuple) => void;
}

const MovableMarker: React.FC<Props> = (props) => {
  const { positon, onMove } = props;
  useMapEvents({
    click: function (event) {
      onMove([event.latlng.lat, event.latlng.lng]);
    },
  });

  return (
    <Marker position={positon}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
};

export default MovableMarker;
