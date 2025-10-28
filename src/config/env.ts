type EnvKey = 'VITE_API_BASE_URL'

const ensureEnv = (key: EnvKey, fallback?: string) => {
  const rawValue = import.meta.env[key]
  const value = typeof rawValue === 'string' && rawValue.length > 0 ? rawValue : fallback

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }

  return value
}

export const env = {
  apiBaseUrl: ensureEnv('VITE_API_BASE_URL', 'http://localhost:8123'),
}
