import { MutationFunction, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addFriend, getAllUsers } from '../../apis/api-client.ts'

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers(),
    staleTime: 5000
  })
}

export function useUserMutation<TData = unknown, TVariables = unknown>
(mutationFn: MutationFunction<TData, TVariables>) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    },
  })
}

export const useAddFriend = () => useMutation(addFriend)