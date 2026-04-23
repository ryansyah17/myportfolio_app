import { useQuery } from "@tanstack/react-query";
import { blogService } from "../services/blogService";

export const useBlogs = () =>
  useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

export const useBlogBySlug = (slug: string) =>
  useQuery({
    queryKey: ["blogs", slug],
    queryFn: () => blogService.getBySlug(slug),
    enabled: !!slug,
  });
