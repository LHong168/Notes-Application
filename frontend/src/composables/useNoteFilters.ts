import { ref, computed } from 'vue'
import { LIST_DATA } from '@/config/data'

export function useNoteFilters() {
  const searchQuery = ref('')
  const sortKey = ref<'title' | 'createdAt'>('createdAt')
  const sortOrder = ref<'asc' | 'desc'>('desc')
  const filterTodayOnly = ref(false)

  const filteredNotes = computed(() => {
    return LIST_DATA.filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.value.toLowerCase())

      const matchesFilter =
        !filterTodayOnly.value || note.createdAt === new Date().toISOString().slice(0, 10)

      return matchesSearch && matchesFilter
    }).sort((a, b) => {
      const aValue = a[sortKey.value]
      const bValue = b[sortKey.value]
      const compare = aValue > bValue ? 1 : aValue < bValue ? -1 : 0
      return sortOrder.value === 'asc' ? compare : -compare
    })
  })

  function setSortKey(key: 'title' | 'createdAt') {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortKey.value = key
      sortOrder.value = 'asc'
    }
  }

  return { searchQuery, sortKey, sortOrder, filterTodayOnly, filteredNotes, setSortKey }
}
