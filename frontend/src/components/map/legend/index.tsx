import "./styles.css";

interface Props {
  children: React.ReactNode;
}

const Legend: React.FC<Props> = ({ children }) => {
  return (
    <div className="map-legend">
      {children}
    </div>
  );
};

export default Legend;
