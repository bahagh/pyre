// src/lib/api.ts
import axios from 'axios'

const BASE = import.meta.env.VITE_API_BASE as string
if (!BASE) {
  // This prevents silent "undefined" URLs
  throw new Error('VITE_API_BASE is not set. Add it to frontend/.env or set envDir in vite.config.ts')
}

export const api = axios.create({ baseURL: BASE })

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('token')
  if (token) {
    cfg.headers = cfg.headers ?? {}
    ;(cfg.headers as any).Authorization = `Bearer ${token}`
  }
  return cfg
})
