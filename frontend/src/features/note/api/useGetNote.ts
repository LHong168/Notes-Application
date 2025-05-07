import { fetchAPI } from '@/config/fetch'
import { useQuery } from '@tanstack/vue-query'

export interface NoteProps {
  id: number
  title: string
  content: string
  created_At: string
}

function getNote(id: number) {
  return fetchAPI<NoteProps>(`/api/Note/${id}`, { method: 'GET' })
}

export const useGetNote = (id: number) =>
  useQuery({
    queryKey: ['note', id],
    queryFn: () => getNote(id),
  })
