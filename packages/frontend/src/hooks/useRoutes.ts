import { useState } from "react";
import { Route } from "../types";

export function useRoutes() {
  const [routes, setRoutes] = useState<Route[]>([]);

  const addRoute = () => {
    const newRoute: Route = {
      id: Date.now().toString(),
      name: `Route ${routes.length + 1}`,
      waypoints: [
        { id: "1", latitude: "40", longitude: "0" },
        { id: "2", latitude: "40", longitude: "-30" },
      ],
    };
    setRoutes([...routes, newRoute]);
    return newRoute;
  };

  const updateRoute = (updatedRoute: Route) => {
    setRoutes(
      routes.map((route) =>
        route.id === updatedRoute.id ? updatedRoute : route
      )
    );
  };

  const deleteRoute = (routeId: string) => {
    setRoutes(routes.filter((route) => route.id !== routeId));
  };

  return { routes, addRoute, updateRoute, deleteRoute };
}
