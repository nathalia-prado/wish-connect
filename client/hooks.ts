import { useState } from 'react'
import { Item } from '../models/item.ts'

export function useItems() {
  const [data, setData] = useState<Item[]>([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const add = {
    mutate: (payload: { item: Item; token: string }, options: any) => {
      setData([...data, payload.item])
      if (options.onSuccess) options.onSuccess()
    },
    isLoading: false,
  }

  const update = {
    mutate: (payload: { item: Item; token: string }, options: any) => {
      const updatedData = data.map((d) =>
        d.id === payload.item.id ? payload.item : d
      )
      setData(updatedData)
      if (options.onSuccess) options.onSuccess()
    },
    isLoading: false,
  }

  const deleteItem = {
    mutate: (payload: { id: number; token: string }, options: any) => {
      const updatedData = data.filter((d) => d.id !== payload.id)
      setData(updatedData)
      if (options.onSuccess) options.onSuccess()
    },
    isLoading: false,
  }

  return {
    data,
    isLoading,
    error,
    add,
    update,
    delete: deleteItem,
    isRefetching: false,
    failureCount: 0,
    status: 'success',
  }
}
