<script setup lang="ts">

interface Props {
  initialValues?: {
    id: number;
    title: string
    content?: string
  }
}

const props = defineProps<Props>()

import { ref, watch } from 'vue';
import { useNoteForm } from '@/composables/useNoteForm';
import { useCreateNote } from '../api/useCreateNoteMutation';
import { useUpdateNote } from '../api/useEditNoteMutation';
import { useRouter } from 'vue-router';

const router = useRouter();
const errorMessage = ref<string | null>(null);

const { handleSubmit, content, setValues, title, titleError } = useNoteForm(props?.initialValues);
const createNote = useCreateNote();
const updateNote = useUpdateNote()

const onSubmit = handleSubmit(async (values) => {
  errorMessage.value = null;

  const formData = {
    title: values.title,
    content: values.content || ""
  }

  try {
    if (props.initialValues) {
      await updateNote.mutateAsync({ id: props.initialValues.id, data: formData })
    } else {
      await createNote.mutateAsync(formData)
    }

    // Redirect to the note list after success
    router.push('/')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'An unexpected error occurred.'
  }
})

watch(() => props.initialValues, (newVal) => {
  if (newVal) setValues(newVal)
}, { immediate: true }
)
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
      <input v-model="title" type="text" class="w-full border rounded px-4 py-2" placeholder="Enter Title"
        :class="{ 'border-red-500': titleError }" />
      <p v-if="titleError" class="text-sm text-red-600 mt-1">{{ titleError }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Content</label>
      <textarea v-model="content" rows="5" placeholder="Enter Content"
        class="w-full border rounded px-4 py-2"></textarea>
    </div>

    <div class="flex justify-end">
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        {{ props.initialValues ? 'Update' : 'Create' }}
      </button>
    </div>
    <p v-if="errorMessage" class="text-sm text-red-600 mt-1 text-center">{{ errorMessage }}</p>

  </form>
</template>
