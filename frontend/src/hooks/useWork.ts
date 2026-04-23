import { useQuery } from "@tanstack/react-query";
import { workService } from "../services/workService";

export const useWorkHistories = () =>
  useQuery({
    queryKey: ["work-histories"],
    queryFn: workService.getAll,
  });
