<script setup lang="ts">
import { IconChevronLeft } from '@tabler/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<template>
  <button @click="goBack" class="flex items-center py-2 text-gray-700 hover:text-gray-900 cursor-pointer">
    <IconChevronLeft class="w-5 h-5 mr-2" />
    Back
  </button>
</template>
