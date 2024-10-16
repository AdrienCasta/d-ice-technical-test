import { useState } from "react";
import { Route, RouteSchema } from "../types";

export function useRoutes() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [saveError, setSaveError] = useState<string | null>(null);

  const addRoute = () => {
    const newRoute: Route = {
      name: `Route ${routes.length + 1}`,
      waypoints: [
        { latitude: 40, longitude: 0 },
        { latitude: 40, longitude: -30 },
      ],
    };
    setRoutes([...routes, newRoute]);
    return newRoute;
  };

  const updateRoute = async (route: Route) => {
    setSaveStatus("loading");
    setSaveError(null);
    try {
      const response = await fetch("http://localhost:3000/routes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(RouteSchema.parse(route)),
      });

      if (!response.ok) {
        throw new Error("Failed to save route");
      }

      setSaveStatus("success");
      return route;
    } catch (error) {
      setSaveStatus("error");
      setSaveError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      throw error;
    }
  };

  const deleteRoute = async (routeId: string) => {
    if (!routeId) return;
    setSaveStatus("loading");
    setSaveError(null);
    try {
      const response = await fetch(`http://localhost:3000/routes/${routeId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete route");
      }

      setSaveStatus("success");
    } catch (error) {
      setSaveStatus("error");
      setSaveError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      throw error;
    }
  };

  const getRoutes = async () => {
    const response = await fetch("http://localhost:3000/routes");
    const data = await response.json();
    setRoutes(data);
  };

  const saveRoute = async (route: Route) => {
    setSaveStatus("loading");
    setSaveError(null);
    try {
      const response = await fetch("http://localhost:3000/routes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(RouteSchema.parse(route)),
      });

      if (!response.ok) {
        throw new Error("Failed to save route");
      }

      setSaveStatus("success");
    } catch (error) {
      setSaveStatus("error");
      setSaveError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      throw error;
    }
  };

  return {
    routes,
    addRoute,
    updateRoute,
    getRoutes,
    deleteRoute,
    saveRoute,
    saveStatus,
    saveError,
  };
}
