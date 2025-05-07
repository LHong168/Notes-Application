<script setup lang="ts">
import BackButton from '@/components/BackButton.vue';
import { reactive } from 'vue'
import NoteForm from '../components/NoteForm.vue';

const formState = reactive({
  title: "Title Example",
  content: "Content Example"
})

function submitForm() {
  console.log('Submitted:', { title: formState.title, content: formState.content })
}
</script>

<template>
  <div class="container max-w-2xl px-4 py-8">
    <BackButton />
    <h1 class="text-2xl font-semibold mb-6 mt-2">Edit Note</h1>

    <NoteForm :initial-values="{ title: 'hello', content: 'world' }" />
  </div>
</template>
