<script setup lang="ts">
import BackButton from '@/components/BackButton.vue';
import NoteForm from '../components/NoteForm.vue';
import { useGetNote } from '../api/useGetNote';
import { useRoute } from 'vue-router';
import { IconLoader } from '@tabler/icons-vue';

const route = useRoute()

const { data, isLoading, isError } = useGetNote(Number(route.params.id))

</script>

<template>
  <div class="container max-w-2xl px-4 py-8">
    <BackButton />
    <h1 class="text-2xl font-semibold mb-6 mt-2">Edit Note</h1>

    <div v-if="isLoading" class="text-gray-500 text-center h-96 flex justify-center items-center">
      <IconLoader class="animate-spin" />
    </div>
    <div v-else-if="isError" class="text-gray-500 text-center h-96 flex justify-center items-center">Note not found or
      failed to load.</div>

    <NoteForm v-else :initial-values="{ id: data?.id || 0, title: data?.title || '', content: data?.content }" />
  </div>
</template>
