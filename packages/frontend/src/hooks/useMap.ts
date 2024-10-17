import mapboxgl from "mapbox-gl";
import { Route } from "../types";
import { useEffect, useRef } from "react";

mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN;

function initializeMap(container: HTMLElement): mapboxgl.Map {
  return new mapboxgl.Map({
    container,
    style: "mapbox://styles/mapbox/dark-v10",
    center: [-30, 40],
    zoom: 3,
  });
}

export default function useMap({
  onMarkerDragEnd,
}: {
  onMarkerDragEnd: (marker: mapboxgl.Marker, waypointIndex: number) => void;
}) {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!map.current) {
      map.current = initializeMap(mapContainer.current!);
    }
  }, []);

  const updateMapRoute = (route: Route | null) => {
    // Remove existing route layer and source
    if (map.current?.getLayer("route")) {
      map.current.removeLayer("route");
    }
    if (map.current?.getSource("route")) {
      map.current.removeSource("route");
    }

    // Remove existing markers
    const existingMarkers = document.querySelectorAll(".waypoint-marker");
    existingMarkers.forEach((marker) => marker.remove());

    if (!route) {
      return;
    }

    map.current?.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route.waypoints.map((wp) => [wp.longitude, wp.latitude]),
        },
      },
    });

    map.current?.addLayer({
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

    route.waypoints.forEach((waypoint, index) => {
      const element = document.createElement("div");
      element.className = "waypoint-marker";
      element.innerHTML =
        index === 0 ? "🚩" : index === route.waypoints.length - 1 ? "🏁" : "🔵";

      const marker = new mapboxgl.Marker({
        element,
        draggable: true,
      })
        .setLngLat([waypoint.longitude, waypoint.latitude])
        .addTo(map.current!);

      marker.on("dragend", () => onMarkerDragEnd(marker, index));
    });
  };

  return {
    map,
    mapContainer,
    updateMapRoute,
  };
}
