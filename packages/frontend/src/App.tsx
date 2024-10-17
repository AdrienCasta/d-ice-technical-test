"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Route } from "./types";
import { initializeMap, updateMapRoute } from "./mapUtils";
import RouteList from "./components/RouteList";
import RouteDetails from "./components/RouteDetails";
import { useRoute } from "./hooks/useRoute";

mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN;

export default function RoutePlanner() {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const { getRoutes, createRoute, updateRoute, deleteRoute } = useRoute();

  const { data: routes } = getRoutes;

  const handleUpdateRoute = (updatedRoute: Route) => {
    updateRoute.mutate(updatedRoute, {
      onSuccess: () => {
        setSelectedRoute(updatedRoute);
      },
    });
  };

  const handleDeleteRoute = (routeId: string) => {
    deleteRoute.mutate(routeId, {
      onSuccess: () => {
        setSelectedRoute(null);
      },
    });
  };

  const handleCreateRoute = (newRoute: Omit<Route, "id">) => {
    createRoute.mutate(newRoute, {
      onSuccess: () => {
        setSelectedRoute(newRoute);
      },
    });
  };

  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  useEffect(() => {
    if (!map.current) {
      map.current = initializeMap(mapContainer.current!);
    }
  }, []);

  useEffect(() => {
    if (map.current && selectedRoute) {
      updateMapRoute(map.current, selectedRoute);
    }
  }, [selectedRoute]);

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
            onSaveRoute={handleCreateRoute}
          />
        ) : (
          <RouteList
            routes={routes || []}
            onSelectRoute={setSelectedRoute}
            onAddRoute={() => {
              handleCreateRoute({
                name: "Route" + routes?.length,
                waypoints: [
                  {
                    latitude: 47.2184,
                    longitude: -1.5536,
                  },
                  {
                    latitude: 45.5017,
                    longitude: -73.5673,
                  },
                ],
              });
            }}
          />
        )}
      </div>
    </div>
  );
}
