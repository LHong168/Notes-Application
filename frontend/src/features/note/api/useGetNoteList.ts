import { fetchAPI } from '@/config/fetch'
import { useQuery } from '@tanstack/vue-query'

export interface NoteProps {
  id: number
  title: string
  content: string
  created_At: string
}

function getNotes() {
  return fetchAPI<NoteProps[]>(`/api/Note`, { method: 'GET' })
}

export const useGetNoteList = () =>
  useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  })
