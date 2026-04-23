import { useQuery } from "@tanstack/react-query";
import { educationService } from "../services/educationService";

export const useEducations = () =>
  useQuery({
    queryKey: ["educations"],
    queryFn: educationService.getAll,
  });
