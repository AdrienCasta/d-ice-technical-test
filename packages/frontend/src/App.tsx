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
  const { routes, addRoute, updateRoute, deleteRoute, saveRoute, getRoutes } =
    useRoutes();
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  useEffect(() => {
    getRoutes();
    if (!map.current) {
      map.current = initializeMap(mapContainer.current!);
    }
  }, []);

  useEffect(() => {
    if (map.current && selectedRoute) {
      updateMapRoute(map.current, selectedRoute);
    }
  }, [selectedRoute]);

  const handleAddRoute = () => {
    const newRoute = addRoute();
    setSelectedRoute(newRoute);
  };

  const handleRouteAction = async (action: () => Promise<any>) => {
    await action();
    setSelectedRoute(null);
    await getRoutes();
  };

  const handleDeleteRoute = () =>
    handleRouteAction(() => {
      if (!selectedRoute?.id) return Promise.resolve();
      return deleteRoute(selectedRoute.id);
    });

  const handleUpdateRoute = (route: Route) =>
    handleRouteAction(() => updateRoute(route));

  const handleSaveRoute = (route: Route) =>
    handleRouteAction(() => saveRoute(route));

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
            onSaveRoute={handleSaveRoute}
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
