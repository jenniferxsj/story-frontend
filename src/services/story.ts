import { useQuery } from "@tanstack/react-query";
import { http } from "../lib/http";
import { type ObjectIdTitleAuthor, type PageRsp, type Story } from "../types/story";

const queryParams = {
  retry: 1,
  retryDelay: 1000,
  staleTime: 5 * 60 * 1000,
};

export function useGetCurrentUserStories(
  username: string | undefined,
  page: number,
  size: number,
  sort: string
) {
  return useQuery({
    queryKey: ["user-story", username, page, size, sort],
    queryFn: async () => {
      try {
        const res = await http.get<PageRsp<Story[]>>("/story/currentUser", {
          params: {
            page,
            size,
            sort,
          },
        });
        return res?.data;
      } catch {
        throw new Error("Error getting current user stories");
      }
    },
    enabled: !!username,
    ...queryParams,
  });
}

export function useGetUserReportList(username: string) {
  return useQuery<Record<number, ObjectIdTitleAuthor>>({
    queryKey: ["user-profile-list", username],
    queryFn: async () => {
      const res = await http.get<ObjectIdTitleAuthor[]>(
        "/profile/currentUser/list"
      );
      const toRecord = res?.data.reduce<Record<number, ObjectIdTitleAuthor>>((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});
      return toRecord;
    },
    enabled: !!username,
    ...queryParams,
  });
}
