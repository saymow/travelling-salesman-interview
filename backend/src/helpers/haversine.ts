type LatLng = [number, number];

const EARTH_RADIUS = 6371;

const degrees_to_radians = (degrees: number) => {
  return degrees * (Math.PI / 180);
};

const haversine = (origin: LatLng, destination: LatLng): number => {
  const [o_lat_degrees, o_lng_degrees] = origin;
  const [d_lat_degrees, d_lng_degrees] = destination;

  const o_lat = degrees_to_radians(o_lat_degrees);
  const o_lng = degrees_to_radians(o_lng_degrees);
  const d_lat = degrees_to_radians(d_lat_degrees);
  const d_lng = degrees_to_radians(d_lng_degrees);

  const delta_lat = d_lat - o_lat;
  const delta_lng = d_lng - o_lng;

  const a =
    Math.sin(delta_lat / 2) ** 2 +
    Math.cos(o_lat) * Math.cos(d_lat) * Math.sin(delta_lng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS * c;
};

export { haversine };
