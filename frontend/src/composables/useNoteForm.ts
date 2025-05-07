import { toTypedSchema } from '@vee-validate/valibot'
import * as v from 'valibot'
import { useField, useForm } from 'vee-validate'

export const useNoteForm = (props?: { title: string; content?: string }) => {
  const schema = toTypedSchema(
    v.pipe(
      v.object({
        title: v.pipe(v.string('Title is required'), v.nonEmpty('Title is required')),
        content: v.optional(v.pipe(v.string())),
      }),
    ),
  )

  const { handleSubmit, setValues } = useForm({
    validationSchema: schema,
    initialValues: props ?? { title: '', content: '' },
  })

  const { value: title, errorMessage: titleError } = useField<string>('title')
  const { value: content } = useField<string>('content')

  return { handleSubmit, setValues, title, content, titleError }
}
