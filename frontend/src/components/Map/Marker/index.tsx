import { Marker as LeafletMarker, Popup } from "react-leaflet";
import { LatLngTuple } from "../helpers";
import { useEffect, useRef } from "react";
import "./styles.css";

export interface Props {
  position: LatLngTuple;
  color?: "blue" | "red";
  text?: string;
}

const Marker: React.FC<Props> = (props) => {
  const { position, color, text } = props;
  const ref = useRef(null);

  useEffect(() => {
    if (color === "red") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ref.current as any)._icon.classList.add("leaflet-marker", "red");
    }
  }, [color]);

  return (
    <LeafletMarker title={text} ref={ref} position={position}>
      {text && (
        <Popup>{text}</Popup>
      )}  
    </LeafletMarker>
  );
};

export default Marker;
