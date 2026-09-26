import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 5000
})

export const calculate = (expression) =>
  api.post('/calculate', { expression })

export const getHistory = () => api.get('/history')

export const deleteHistory = (id) => api.delete(`/history/${id}`)

export const clearHistory = () => api.delete('/history')