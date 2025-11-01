import { useQuery } from "@tanstack/react-query";
import { http } from "../lib/http";
import type { PageRsp, Story } from "../types/story";

const queryParams = {
  retry: 1,
  retryDelay: 1000,
  staleTime: 5 * 60 * 1000
}

export function useGetCurrentUserStories(username: string | undefined, page: number, size: number, sort: string) {
  return useQuery({
    queryKey: ['user-story', username, page, size, sort],
    queryFn: async () => {
      try {
        const res = await http.get<PageRsp<Story[]>>('/story/currentUser', {
            params: {
                page, size, sort
            }
        })
        console.log('profile data: ', res)
        return res?.data?.content;
      } catch {
        throw new Error('Error getting current user stories')
      }
    },
    enabled: !!username,
    ...queryParams
  });
};