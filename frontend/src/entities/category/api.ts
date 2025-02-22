import { httpService } from '../../services/httpService';
import { Category } from './model';

async function getCategories() {
    return await httpService.get<Category[]>('/categories');
}

async function addCategory(name: string) {
    return await httpService.post<{ _id: string }>('/categories', { name });
}

async function delCategory(id: string) {
    return await httpService.delete(`/categories/${id}`);
}

export const categoryApi = {
    getCategories,
    addCategory,
    delCategory,
};
