import { Button } from "@/components/ui/button";
import { Route } from "../types";

type RouteListProps = {
  routes: Route[];
  onSelectRoute: (route: Route) => void;
  onAddRoute: () => void;
};

export default function RouteList({
  routes,
  onSelectRoute,
  onAddRoute,
}: RouteListProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Routes</h2>
      {routes.map((route) => (
        <Button
          key={route.id}
          variant="ghost"
          className="w-full justify-start mb-2"
          onClick={() => onSelectRoute(route)}
        >
          {route.name}
        </Button>
      ))}
      <Button className="w-full mt-4" onClick={onAddRoute}>
        + Add new route
      </Button>
    </div>
  );
}
