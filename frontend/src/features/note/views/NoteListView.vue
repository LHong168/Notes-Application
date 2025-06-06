<script setup lang="ts">
import { useNoteFilters } from '@/composables/useNoteFilters'
import { useRouter } from 'vue-router'
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-vue';
import { getDateTime } from '@/utils/date-time-format';
import { useConfirmDialog } from '@/composables/useConfirmDialog';
import { useDeleteNote } from '../api/useDeleteNoteMutation';

const router = useRouter()
const { searchQuery, filterTodayOnly, filteredNotes, sortKey, setSortKey, sortOrder } = useNoteFilters()
const { mutateAsync } = useDeleteNote();
const { open } = useConfirmDialog();

function goToDetail(id: number) {
  router.push(`/${id}`)
}

function editNote(id: number) {
  router.push(`/${id}/edit`)
}

function deleteNote(id: number, title: string) {
  open(`Are you sure you want to delete "${title}" ?`,
    async () => {
      await mutateAsync(id)
    })
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
    <div class="flex justify-between items-start sm:items-center gap-4 flex-wrap">
      <div class="flex max-sm:flex-col gap-3">
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
      <table v-if="!!filteredNotes.length" class="w-full text-sm text-left text-gray-700 min-w-lg">
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
              class="px-6 py-4 font-medium text-gray-900 hover:underline underline-offset-2 cursor-pointer min-w-sm max-w-xs"
              @click="goToDetail(note.id)">
              {{ note.title }}
            </td>
            <td class="px-6 py-4 max-w-lg min-w-sm">
              {{ note.content || 'N/A' }}
            </td>
            <td class="px-6 py-4  min-w-40">
              {{ getDateTime(note.created_At) }}
            </td>
            <td class="px-6 py-4 flex gap-2 items-center">
              <button class="text-blue-600 hover:underline cursor-pointer" @click.stop="editNote(note.id)">
                Edit
              </button>
              <button class="text-red-600 hover:underline cursor-pointer" @click.stop="deleteNote(note.id, note.title)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="h-52 flex justify-center items-center">
        <p>No Data</p>
      </div>
    </div>
  </div>
</template>
