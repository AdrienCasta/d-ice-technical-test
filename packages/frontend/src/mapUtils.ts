import mapboxgl from "mapbox-gl";
import { Route } from "./types";

export function initializeMap(container: HTMLElement): mapboxgl.Map {
  return new mapboxgl.Map({
    container,
    style: "mapbox://styles/mapbox/dark-v10",
    center: [-30, 40],
    zoom: 3,
  });
}

export function updateMapRoute(map: mapboxgl.Map, route: Route) {
  // Clear existing layers and sources
  if (map.getLayer("route")) map.removeLayer("route");
  if (map.getSource("route")) map.removeSource("route");

  // Add the route to the map
  map.addSource("route", {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route.waypoints.map((wp) => [
          parseFloat(wp.longitude),
          parseFloat(wp.latitude),
        ]),
      },
    },
  });

  map.addLayer({
    id: "route",
    type: "line",
    source: "route",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#4285F4",
      "line-width": 3,
    },
  });

  // Add markers for waypoints
  route.waypoints.forEach((waypoint, index) => {
    const el = document.createElement("div");
    el.className = "waypoint-marker";
    el.innerHTML =
      index === 0 ? "🚩" : index === route.waypoints.length - 1 ? "🏁" : "🔵";

    new mapboxgl.Marker(el)
      .setLngLat([
        parseFloat(waypoint.longitude),
        parseFloat(waypoint.latitude),
      ])
      .addTo(map);
  });
}
