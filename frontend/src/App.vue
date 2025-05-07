<script setup lang="ts">
import { RouterView } from 'vue-router'
import NoteHeaderView from './features/note/components/NoteHeaderView.vue';
import ConfirmDialog from './components/ConfirmDialog.vue';
</script>

<template>
  <NoteHeaderView />
  <RouterView />
  <ConfirmDialog />
</template>
