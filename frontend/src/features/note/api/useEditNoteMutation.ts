import { fetchAPI } from '@/config/fetch'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { NoteProps } from './useGetNote'

function updateNote(id: number, data: Omit<NoteProps, 'id' | 'created_At'>) {
  return fetchAPI<NoteProps>(`/api/Note/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export const useUpdateNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<NoteProps, 'id' | 'created_At'> }) =>
      updateNote(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['note', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}
