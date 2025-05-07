<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function getHome() {
  router.push("/")
}
</script>

<template>
  <header class="bg-primary">
    <nav class="container py-8">
      <h1 class="font-semibold text-lg sm:text-2xl text-white text-shadow-2xs cursor-pointer" @click="getHome">Notes
        Application
      </h1>
    </nav>
  </header>
</template>
