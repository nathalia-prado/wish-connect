import { MutationFunction, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addFriend, getAllUsers, removeFriend } from '../client/apis/api-client.ts'

export const useUserQuery = () => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers(),
    staleTime: 5000
  })
  return {
    ...query,
    addFriend: useAddFriend(),
    removeFriend: useRemoveFriend()
  }
}

export function useUserMutation<TData = unknown, TVariables = unknown>
(mutationFn: MutationFunction<TData, TVariables>) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries(['users'])
  })
}

export const useAddFriend = () => useUserMutation(addFriend)
export const useRemoveFriend = () => useUserMutation(removeFriend)