"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Route } from "./types";
import { initializeMap, updateMapRoute } from "./mapUtils";
import RouteList from "./components/RouteList";
import RouteDetails from "./components/RouteDetails";
import { useRoutes } from "./hooks/useRoutes";

mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN;

export default function RoutePlanner() {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { routes, addRoute, updateRoute, deleteRoute } = useRoutes();
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  useEffect(() => {
    if (map.current) return;
    map.current = initializeMap(mapContainer.current!);
  }, []);

  useEffect(() => {
    if (!map.current || !selectedRoute) return;
    updateMapRoute(map.current, selectedRoute);
  }, [selectedRoute]);

  const handleAddRoute = () => {
    const newRoute = addRoute();
    setSelectedRoute(newRoute);
  };

  const handleDeleteRoute = () => {
    deleteRoute((selectedRoute as Route).id);
    setSelectedRoute(null);
  };

  const handleUpdateRoute = (updatedRoute: Route) => {
    updateRoute(updatedRoute);
    setSelectedRoute(updatedRoute);
  };

  return (
    <div className="flex h-screen">
      <div ref={mapContainer} className="flex-grow" />
      <div className="w-80 bg-slate-900 text-white p-4 overflow-y-auto">
        {selectedRoute ? (
          <RouteDetails
            route={selectedRoute}
            onBack={() => setSelectedRoute(null)}
            onUpdate={handleUpdateRoute}
            onDelete={handleDeleteRoute}
          />
        ) : (
          <RouteList
            routes={routes}
            onSelectRoute={setSelectedRoute}
            onAddRoute={handleAddRoute}
          />
        )}
      </div>
    </div>
  );
}
