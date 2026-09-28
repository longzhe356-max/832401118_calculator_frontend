import axios from 'axios'

const api = axios.create({
  baseURL: 'https://832401118calculatorbackend-production.up.railway.app/api',
  timeout: 5000
})

export const calculate = (expression) =>
  api.post('/calculate', { expression })

export const getHistory = () => api.get('/history')

export const deleteHistory = (id) => api.delete(`/history/${id}`)

export const clearHistory = () => api.delete('/history')