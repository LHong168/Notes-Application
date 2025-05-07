import { toTypedSchema } from '@vee-validate/valibot'
import { object, optional, string } from 'valibot'
import { useField, useForm } from 'vee-validate'

export const useNoteForm = (props?: { title: string; content?: string }) => {
  const schema = toTypedSchema(
    object({
      title: string('Title is required'),
      content: optional(string()),
    }),
  )

  const { handleSubmit, setValues } = useForm({
    validationSchema: schema,
    initialValues: props ?? { title: '', content: '' },
  })

  const { value: title, errorMessage: titleError } = useField<string>('title')
  const { value: content } = useField<string>('content')

  return { handleSubmit, setValues, title, content, titleError }
}
