import { fetchAPI } from '@/config/fetch'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

function deleteNote(id: number) {
  return fetchAPI<void>(`/api/Note/${id}`, {
    method: 'DELETE',
  })
}

export const useDeleteNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}
