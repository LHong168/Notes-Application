<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>

<template>
  <div class="flex items-center justify-center min-h-[70vh]">
    <div class="text-center p-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">404 - Not Found</h1>
      <p class="text-lg text-gray-600 mb-6">Sorry, the page you're looking for doesn't exist.</p>
      <button @click="goHome" class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer">
        Go Back to Home
      </button>
    </div>
  </div>
</template>
