import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../api-client.ts'

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers(),
    staleTime: 5000
  })
}