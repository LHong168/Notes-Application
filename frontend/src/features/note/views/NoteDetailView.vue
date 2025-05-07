<script setup lang="ts">
import BackButton from '@/components/BackButton.vue';
import { ref } from 'vue';

const note = ref({
  title: 'First Note',
  content: 'This is the content of the note, and here are some details.',
  createdAt: '2025-05-06',
});

const editNote = () => {
  console.log('Edit note');
};

const deleteNote = () => {
  console.log('Delete note');
};
</script>

<template>
  <div class="container max-w-4xl py-8">
    <BackButton />
    <div class="mt-8 p-6 bg-white shadow-md rounded-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-3xl font-semibold text-gray-800">{{ note.title }}</h2>
        <div class="space-x-3 flex">
          <button
            class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            @click="editNote"
          >
            Edit
          </button>
          <button
            class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            @click="deleteNote"
          >
            Delete
          </button>
        </div>
      </div>

      <div class="mb-4 text-gray-600">
        <p class="font-medium text-gray-800">Created on: <span class="font-normal">{{ note.createdAt }}</span></p>
      </div>

      <div class="mb-6">
        <h3 class="text-xl font-semibold text-gray-700 mb-2">Content</h3>
        <p class="text-gray-800">{{ note.content }}</p>
      </div>
    </div>
  </div>
</template>
