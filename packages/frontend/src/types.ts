export type Waypoint = {
  id: string;
  latitude: string;
  longitude: string;
};

export type Route = {
  id: string;
  name: string;
  waypoints: Waypoint[];
};
