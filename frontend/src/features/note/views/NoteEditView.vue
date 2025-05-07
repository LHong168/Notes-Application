<script setup lang="ts">
import BackButton from '@/components/BackButton.vue';
import NoteForm from '../components/NoteForm.vue';

</script>

<template>
  <div class="container max-w-2xl px-4 py-8">
    <BackButton />
    <h1 class="text-2xl font-semibold mb-6 mt-2">Edit Note</h1>

    <NoteForm :initial-values="{ title: 'hello', content: 'world' }" />
  </div>
</template>
