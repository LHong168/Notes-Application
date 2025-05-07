import { fetchAPI } from '@/config/fetch'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { NoteProps } from './useGetNote'

function createNote(data: Omit<NoteProps, 'id' | 'created_At'>) {
  return fetchAPI<NoteProps>('/api/Note', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const useCreateNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}
