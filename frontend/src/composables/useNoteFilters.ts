import { useGetNoteList } from '@/features/note/api/useGetNoteList'
import { ref, computed } from 'vue'

export function useNoteFilters() {
  const searchQuery = ref('')
  const sortKey = ref<'title' | 'created_At'>('created_At')
  const sortOrder = ref<'asc' | 'desc'>('desc')
  const filterTodayOnly = ref(false)

  const { data: notes } = useGetNoteList()

  const filteredNotes = computed(() => {
    return (notes?.value || [])
      .filter((note) => {
        const matchesSearch =
          note.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.value.toLowerCase())

        const matchesFilter =
          !filterTodayOnly.value ||
          note.created_At.slice(0, 10) === new Date().toISOString().slice(0, 10)

        return matchesSearch && matchesFilter
      })
      .sort((a, b) => {
        const aValue = a[sortKey.value]
        const bValue = b[sortKey.value]
        const compare = aValue > bValue ? 1 : aValue < bValue ? -1 : 0
        return sortOrder.value === 'asc' ? compare : -compare
      })
  })

  function setSortKey(key: 'title' | 'created_At') {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortKey.value = key
      sortOrder.value = 'asc'
    }
  }

  return { searchQuery, sortKey, sortOrder, filterTodayOnly, filteredNotes, setSortKey }
}
