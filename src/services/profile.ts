import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "../lib/http";
import type { BookProfile, PageRsp } from "../types/story";

const queryParams = {
  retry: 1,
  retryDelay: 1000,
  staleTime: 5 * 60 * 1000,
};

export interface CreateBookProfilePayload {
  title: string;
  author: string;
};

export function useGetCurrentUserProfiles(
  username: string | undefined,
  page: number,
  size: number,
  sort: string
) {
  return useQuery({
    queryKey: ["user-profile", username, page, size, sort],
    queryFn: async () => {
      try {
        const res = await http.get<PageRsp<BookProfile[]>>(
          "/profile/currentUser",
          {
            params: {
              page,
              size,
              sort,
            },
          }
        );
        return res?.data;
      } catch {
        throw new Error("Error getting current user profiles");
      }
    },
    enabled: !!username,
    ...queryParams,
  });
}

export function useCreateBookProfile(
  onCreateBookProfile: (data: BookProfile) => void,
  errorCreateBookProfile: (error: unknown) => void,
  username: string,
) {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: CreateBookProfilePayload) => {
    const { data } = await http.post("/profile", req);
    return data;
    },
    onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["user-profile", username] });
        onCreateBookProfile(res);
    },
    onError: (error) => {
        errorCreateBookProfile(error)
    }
  });
};
