import { Category } from '../../models/category';

export interface UpdateCategoryParams {
  nome?: string;
  descricao?: string;
}

export interface IUpdateCategoryRepository {
  updateCategory(id: string, params: UpdateCategoryParams): Promise<Category>;
}
