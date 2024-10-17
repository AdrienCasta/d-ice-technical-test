"use client";

import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Route } from "./types";
import useMap from "./hooks/useMap";
import RouteList from "./components/RouteList";
import RouteDetails from "./components/RouteDetails";
import { useRoute } from "./hooks/useRoute";

export default function RoutePlanner() {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  const { mapContainer, updateMapRoute } = useMap({
    onMarkerDragEnd: (marker, waypointIndex) => {
      if (!selectedRoute) return;
      handleUpdateRoute({
        ...selectedRoute,
        waypoints: selectedRoute?.waypoints.map((waypoint, index) => {
          if (index === waypointIndex) {
            return {
              ...waypoint,
              latitude: marker.getLngLat().lat,
              longitude: marker.getLngLat().lng,
            };
          }
          return waypoint;
        }),
      });
    },
  });

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

  const handleCreateRoute = (route: Omit<Route, "id">) => {
    createRoute.mutate(route, {
      onSuccess: (newRoute) => {
        setSelectedRoute(newRoute);
      },
    });
  };

  useEffect(() => {
    updateMapRoute(selectedRoute);
  }, [selectedRoute, updateMapRoute]);

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
