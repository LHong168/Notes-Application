<script setup lang="ts">

interface Props {
  initialValues?: {
    title?: string
    content?: string
  }
}

const props = defineProps<Props>()

import { useForm, useField } from 'vee-validate'
import { object, string, optional } from 'valibot'
import { toTypedSchema } from '@vee-validate/valibot'
import { watch } from 'vue';

const schema = toTypedSchema(
  object({
    title: string('Title is required'),
    content: optional(string()),
  })
)

const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: props.initialValues ?? { title: '', content: '' },
})

const { value: title, errorMessage: titleError } = useField<string>('title')
const { value: content } = useField<string>('content')

const onSubmit = handleSubmit((values) => {
  if (props.initialValues) {

    return
  }
  console.log('Submitted:', values)
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
        Submit
      </button>
    </div>
  </form>
</template>
