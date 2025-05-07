<script setup lang="ts">
import { RouterView } from 'vue-router'
import NoteHeaderView from './features/note/components/NoteHeaderView.vue';
</script>

<template>
  <NoteHeaderView />
  <RouterView />
</template>
