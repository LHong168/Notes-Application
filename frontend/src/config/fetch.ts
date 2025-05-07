export const getStaticURL = (path = '') => {
  return `${import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5292'}${path}`
}

export const fetchAPI = async <T>(path: string, options = {}) => {
  const mergedOptions = {
    headers: { 'Content-Type': 'Application/Json' },
    ...options,
  }

  // Trigger API call
  const response = await fetch(getStaticURL(path), mergedOptions)

  // Handle response
  if (!response.ok) {
    const res = (await response.json()) as { message: string }
    throw new Error(res.message || `An error occurred please try again`)
  }

  return response.json() as T
}
