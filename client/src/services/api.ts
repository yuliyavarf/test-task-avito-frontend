import axios from 'axios';
import { Item } from '../types/item';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const itemsApi = {
  getAll: () => api.get<Item[]>('/items').then(res => res.data),
  
  getById: (id: number) => api.get<Item>(`/items/${id}`).then(res => res.data),
  
  create: (item: Omit<Item, 'id'>) => 
    api.post<Item>('/', item).then(res => res.data),
  
  update: (id: number, item: Partial<Item>) =>
    api.put<Item>(`/${id}`, item).then(res => res.data),
  
  delete: (id: number) =>
    api.delete(`/${id}`),
}; 