import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Route } from "../types";

const API_URL = "http://localhost:3000/routes";

export const useRoute = () => {
  const queryClient = useQueryClient();

  const getRoutes = useQuery<Route[], Error>({
    queryKey: ["routes"],
    queryFn: async () => {
      const { data } = await axios.get<Route[]>(API_URL);
      return data;
    },
  });

  const createRoute = useMutation<Route, Error, Omit<Route, "id">>({
    mutationFn: async (newRoute) => {
      const { data } = await axios.post<{ value: Route }>(API_URL, newRoute);
      return data.value;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routes"] });
    },
  });

  const updateRoute = useMutation<Route, Error, Route>({
    mutationFn: async (updatedRoute) => {
      const { data } = await axios.put<Route>(`${API_URL}`, updatedRoute);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routes"] });
    },
  });

  const deleteRoute = useMutation<void, Error, string>({
    mutationFn: async (routeId) => {
      await axios.delete(`${API_URL}/${routeId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routes"] });
    },
  });

  return {
    getRoutes,
    createRoute,
    updateRoute,
    deleteRoute,
  };
};
