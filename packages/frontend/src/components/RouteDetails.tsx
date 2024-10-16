import React, { useState } from "react";
import { ChevronLeft, Trash2, Edit2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Route, Waypoint } from "../types";

type RouteDetailsProps = {
  route: Route;
  onBack: () => void;
  onUpdate: (route: Route) => void;
  onDelete: () => void;
};

export default function RouteDetails({
  route,
  onBack,
  onUpdate,
  onDelete,
}: RouteDetailsProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(route.name);

  const updateWaypoint = (
    waypointId: string,
    field: keyof Waypoint,
    value: string
  ) => {
    const updatedWaypoints = route.waypoints.map((wp) =>
      wp.id === waypointId ? { ...wp, [field]: value } : wp
    );
    onUpdate({ ...route, waypoints: updatedWaypoints });
  };

  const deleteWaypoint = (waypointId: string) => {
    const updatedWaypoints = route.waypoints.filter(
      (wp) => wp.id !== waypointId
    );
    onUpdate({ ...route, waypoints: updatedWaypoints });
  };

  const saveEditedName = () => {
    onUpdate({ ...route, name: editedName });
    setIsEditingName(false);
  };

  return (
    <>
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {isEditingName ? (
          <div className="flex items-center ml-2">
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white"
            />
            <Button variant="ghost" size="icon" onClick={saveEditedName}>
              <Check className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center ml-2">
            <h2 className="text-xl font-bold">{route.name}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditingName(true)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Step</th>
            <th className="text-left">Latitude</th>
            <th className="text-left">Longitude</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {route.waypoints.map((waypoint, index) => (
            <tr key={waypoint.id}>
              <td>WP{index + 1}</td>
              <td>
                <Input
                  type="text"
                  value={waypoint.latitude}
                  onChange={(e) =>
                    updateWaypoint(waypoint.id, "latitude", e.target.value)
                  }
                  className="w-20 bg-slate-800 border-slate-700"
                />
              </td>
              <td>
                <Input
                  type="text"
                  value={waypoint.longitude}
                  onChange={(e) =>
                    updateWaypoint(waypoint.id, "longitude", e.target.value)
                  }
                  className="w-20 bg-slate-800 border-slate-700"
                />
              </td>
              <td>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteWaypoint(waypoint.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button className="w-full mt-4" onClick={onDelete}>
        Delete Route
      </Button>
    </>
  );
}
