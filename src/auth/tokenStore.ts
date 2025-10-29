const ACCESS_KEY = 'accessToken'
const JTI_KEY = 'refreshJti'

let accessTokenMemory: string | null = null
let refreshJtiMemory: string | null = null

const getStorage = (): Storage | null => {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return window.localStorage
  } catch {
    return null
  }
}

const readFromStorage = (key: string) => {
  const storage = getStorage()
  return storage?.getItem(key) ?? null
}

const writeToStorage = (key: string, value: string | null) => {
  const storage = getStorage()
  if (!storage) {
    return
  }

  if (value) {
    storage.setItem(key, value)
  } else {
    storage.removeItem(key)
  }
}

export const tokenStore = {
  getAccess(): string | null {
    return accessTokenMemory ?? readFromStorage(ACCESS_KEY)
  },
  setAccess(token: string | null) {
    accessTokenMemory = token
    writeToStorage(ACCESS_KEY, token)
  },
  getJti(): string | null {
    return refreshJtiMemory ?? readFromStorage(JTI_KEY)
  },
  setJti(jti: string | null) {
    refreshJtiMemory = jti
    writeToStorage(JTI_KEY, jti)
  },
  clearAll() {
    this.setAccess(null)
    this.setJti(null)
  },
}
