import { useQuery } from "@tanstack/react-query";
import { http } from "../lib/http";
import type { BookProfile, PageRsp } from "../types/story";

const queryParams = {
  retry: 1,
  retryDelay: 1000,
  staleTime: 5 * 60 * 1000
}

export function useGetCurrentUserProfiles(username: string | undefined, page: number, size: number, sort: string) {
  return useQuery({
    queryKey: ['user-profile', username, page, size, sort],
    queryFn: async () => {
      try {
        const res = await http.get<PageRsp<BookProfile[]>>('/profile/currentUser', {
            params: {
                page, size, sort
            }
        })
        console.log('profile data: ', res)
        return res?.data?.content;
      } catch {
        throw new Error('Error getting current user')
      }
    },
    enabled: !!username,
    ...queryParams
  });
};