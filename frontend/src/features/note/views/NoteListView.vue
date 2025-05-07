<script setup lang="ts">
import { useNoteFilters } from '@/composables/useNoteFilters'
import { useRouter } from 'vue-router'
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-vue';
import { getDateTime } from '@/utils/date-time-format';

const router = useRouter()
const { searchQuery, filterTodayOnly, filteredNotes, sortKey, setSortKey, sortOrder } = useNoteFilters()

function goToDetail(id: number) {
  router.push(`/${id}`)
}

function editNote(id: number) {
  router.push(`/${id}/edit`)
}

function deleteNote(id: number) {
  alert(`Delete note with ID ${id}`)
}

function createNote() {
  router.push(`/create`)
}

function getSortIcon(key: 'title' | 'created_At') {
  if (sortKey.value !== key) return IconSelector
  return sortOrder.value === 'asc' ? IconChevronUp : IconChevronDown
}
</script>

<template>
  <div class="container py-12 space-y-6">
    <div class="flex justify-between items-center gap-4 flex-wrap">
      <div class="flex gap-3">
        <input type="text" v-model="searchQuery" placeholder="Search notes..."
          class="border rounded px-3 py-2 w-full sm:w-auto" />

        <label class="flex items-center space-x-2">
          <input type="checkbox" v-model="filterTodayOnly" />
          <span>Today only</span>
        </label>
      </div>

      <button @click="createNote" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Create Note
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-700">
        <thead class="text-xs uppercase bg-gray-100 text-gray-600">
          <tr>
            <th class="px-6 py-3 cursor-pointer select-none flex items-center gap-1" @click="setSortKey('title')">
              Title
              <component :is="getSortIcon('title')" class="w-4 h-4" />
            </th>

            <th class="px-6 py-3">Content</th>

            <th class="px-6 py-3 cursor-pointer select-none flex items-center gap-1" @click="setSortKey('created_At')">
              Created At
              <component :is="getSortIcon('created_At')" class="w-4 h-4" />
            </th>
            <th class="px-6 py-3 rounded-e-lg">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="note in filteredNotes" :key="note.id" class="bg-white border-b border-b-gray-300 hover:bg-gray-50">
            <td
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:underline underline-offset-2 cursor-pointer"
              @click="goToDetail(note.id)">
              {{ note.title }}
            </td>
            <td class="px-6 py-4">
              {{ note.content }}
            </td>
            <td class="px-6 py-4">
              {{ getDateTime(note.created_At) }}
            </td>
            <td class="px-6 py-4 flex gap-2">
              <button class="text-blue-600 hover:underline cursor-pointer" @click.stop="editNote(note.id)">
                Edit
              </button>
              <button class="text-red-600 hover:underline cursor-pointer" @click.stop="deleteNote(note.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
