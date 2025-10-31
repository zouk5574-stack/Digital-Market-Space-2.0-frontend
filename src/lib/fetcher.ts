// src/lib/fetcher.ts
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json'
  }
})

export async function fetcher<T = any>(url: string, config = {}): Promise<T> {
  const res = await api.get(url, config)
  return res.data
}

export default api
