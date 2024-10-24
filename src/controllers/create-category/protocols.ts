import { Category } from "../../models/category";

export interface CreateCategoryParams {
  nome: string;
  descricao?: string;
}

export interface ICreateCategoryRepository {
  createCategory(params: CreateCategoryParams): Promise<Category>;
}
