<script setup lang="ts">
import { useConfirmDialog } from '@/composables/useConfirmDialog';

const { isOpen, message, error, confirm, cancel } = useConfirmDialog();
</script>

<template>
  <div v-if="isOpen" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

    <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-base font-semibold text-gray-900" id="modal-title">Delete Note</h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">{{ message }}</p>
              </div>
            </div>
          </div>
          <div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row justify-end sm:px-6">
              <button type="button" @click="cancel"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
              <button type="button" @click="confirm"
                class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">Confirm</button>
            </div>
            <p v-if="!!error" class="text-sm text-red-600 text-center mb-5">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
