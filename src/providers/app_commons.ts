import { QueryClient } from "@tanstack/react-query";
import mockAPI from "../api/mock-api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Task } from "../types/global.types";
import { toast } from "react-toastify";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

export const useAllTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => mockAPI.getAllTasks(),
  });
};

export const useUpdateTask = () => {
  return useMutation({
    mutationFn: (updatedTask: Task) => mockAPI.updateTask(updatedTask),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
};

export const useCreateTask = () => {
  return useMutation({
    mutationFn: (task: Omit<Task, "id">) => mockAPI.createTask(task),
    onSuccess: () => {
      toast.success("Task created successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useSearchTasks = () => {
  return useMutation({
    mutationFn: (query : string) => mockAPI.searchTasks(query),
    onSuccess: (data : Task[]) => {
        queryClient.setQueryData(["tasks"], data);
    },
  });
};


export const useDeleteTask = () => {
  return useMutation({
    mutationFn: (id: number) => mockAPI.deleteTask(id),
    onSuccess: () => {
      toast.success("Task deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};