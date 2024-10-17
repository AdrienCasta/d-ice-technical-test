import { ChevronLeft, Trash2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Route, RouteSchema } from "../types";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";

type RouteDetailsProps = {
  route: Route;
  onBack: () => void;
  onUpdate: (route: Route) => void;
  onDelete: (routeId: string) => void;
  onSaveRoute: (route: RouteSchemaType) => void;
};

type RouteSchemaType = z.infer<typeof RouteSchema>;

export default function RouteDetails({
  route,
  onBack,
  onUpdate,
  onDelete,
  onSaveRoute,
}: RouteDetailsProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
  } = useForm<RouteSchemaType>({
    defaultValues: route,
    resolver: zodResolver(RouteSchema),
    mode: "onChange",
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: "waypoints",
    rules: { minLength: 2 },
  });

  const addWaypoint = () => {
    append({ latitude: 0, longitude: 0 });
  };

  const removeWaypoint = (index: number) => {
    if (fields.length > 2) {
      remove(index);
    }
  };

  React.useEffect(() => {
    const subscription = watch((value) => {
      if (isValid) {
        onUpdate(value as Route);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, isDirty, isValid, onUpdate]);

  return (
    <form>
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={onBack} type="button">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Route Name"
              className="ml-2 flex-grow bg-slate-800 border-slate-700"
            />
          )}
        />
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
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <tr>
                <td>WP{index + 1}</td>
                <td>
                  <Controller
                    name={`waypoints.${index}.latitude`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        max={90}
                        min={-90}
                        onChange={(e) => {
                          field.onChange(e.target.valueAsNumber);
                        }}
                        type="number"
                        className="w-20 bg-slate-800 border-slate-700"
                      />
                    )}
                  />
                </td>
                <td>
                  <Controller
                    name={`waypoints.${index}.longitude`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        max={180}
                        min={-180}
                        onChange={(e) => {
                          field.onChange(e.target.valueAsNumber);
                        }}
                        className="w-20 bg-slate-800 border-slate-700"
                      />
                    )}
                  />
                </td>
                <td>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeWaypoint(index)}
                    type="button"
                    disabled={fields.length <= 2}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
              {index < fields.length - 1 && (
                <tr>
                  <td colSpan={4} className="h-2"></td>
                </tr>
              )}
            </React.Fragment>
          ))}
          <tr>
            <td colSpan={4}>
              <Button
                variant="ghost"
                size="sm"
                onClick={addWaypoint}
                type="button"
                className="w-full"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Waypoint
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
      <Button
        className="w-full mt-4"
        onClick={() => onDelete(route.id!)}
        type="button"
      >
        Delete Route
      </Button>
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      {errors.waypoints && (
        <p className="text-red-500">{errors.waypoints.message}</p>
      )}
    </form>
  );
}
