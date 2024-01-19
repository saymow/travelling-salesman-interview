import "leaflet/dist/leaflet.css";
import { MapContainer as LeafLetMapContainer, TileLayer } from "react-leaflet";
import MovableMarker from "./MovableMarker";
import { LatLngTuple } from "./helpers";

interface Props {
  height: number;
  markerPosition: LatLngTuple;
  onMarketPositionChange: (latLng: LatLngTuple) => void;
}

const MapContainer: React.FC<Props> = (props) => {
  const { height, markerPosition, onMarketPositionChange } = props;

  const handleMarkerMove = (newPosition: LatLngTuple) => {
    onMarketPositionChange(newPosition);
  };

  return (
    <LeafLetMapContainer
      style={{ height }}
      center={markerPosition}
      zoom={20}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MovableMarker positon={markerPosition} onMove={handleMarkerMove} />
    </LeafLetMapContainer>
  );
};

export default MapContainer;
