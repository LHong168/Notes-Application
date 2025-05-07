import { ref } from 'vue'

const isOpen = ref(false)
const message = ref('')
const error = ref('')
const onConfirm = ref<() => void | Promise<void>>(() => {})
const onCancel = ref<() => void>(() => {})

function open(msg: string, confirmFn: () => void, cancelFn?: () => void) {
  message.value = msg
  error.value = ''
  onConfirm.value = confirmFn
  onCancel.value = cancelFn || (() => {})
  isOpen.value = true
}

async function confirm() {
  try {
    error.value = ''
    await onConfirm.value()
    isOpen.value = false
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An unexpected error occurred.'
  }
}

function cancel() {
  onCancel.value()
  isOpen.value = false
}

export function useConfirmDialog() {
  return { isOpen, message, error, open, confirm, cancel }
}
