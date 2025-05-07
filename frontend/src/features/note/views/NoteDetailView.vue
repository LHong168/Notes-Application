<script setup lang="ts">
import BackButton from '@/components/BackButton.vue';
import { useGetNote } from '../api/useGetNote';
import { useRoute, useRouter } from 'vue-router'
import { getDateTime } from '@/utils/date-time-format';
import { IconLoader } from '@tabler/icons-vue';
import { useConfirmDialog } from '@/composables/useConfirmDialog';
import { useDeleteNote } from '../api/useDeleteNoteMutation';

const route = useRoute()
const { data, isLoading, isError } = useGetNote(Number(route.params.id))
const { mutateAsync } = useDeleteNote();
const { open } = useConfirmDialog();

const router = useRouter();

const editNote = () => {
  router.push(`/${route.params.id}/edit`);
};

const deleteNote = (id: number, title: string) => {
  open(`Are you sure you want to delete "${title}" ?`,
    async () => {
      await mutateAsync(id);
      router.push('/')
    })
};

</script>

<template>
  <div class="container max-w-4xl py-8 bg-gray-50">
    <BackButton />

    <div v-if="isLoading" class="text-gray-500 text-center h-96 flex justify-center items-center">
      <IconLoader class="animate-spin" />
    </div>
    <div v-else-if="isError" class="text-gray-500 text-center h-96 flex justify-center items-center">Note not found or
      failed to load.</div>

    <div v-else class="mt-8 p-6 bg-white shadow-md rounded-lg">
      <div class="space-x-3 flex justify-end mb-3">
        <button class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600" @click="editNote">
          Edit
        </button>
        <button class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          @click="deleteNote(data?.id || 0, data?.title || '')">
          Delete
        </button>
      </div>
      <h2 class="text-3xl font-semibold text-gray-800 mb-5">{{ data?.title }}</h2>

      <div class="mb-4 text-gray-600">
        <p class="font-medium text-gray-800">Created on:
          <span class="font-normal">{{ getDateTime(data?.created_At) }}</span>
        </p>
      </div>

      <div class="mb-6">
        <h3 class="text-xl font-semibold text-gray-700 mb-2">Content</h3>
        <p class="text-gray-800">{{ data?.content }}</p>
      </div>
    </div>
  </div>
</template>
