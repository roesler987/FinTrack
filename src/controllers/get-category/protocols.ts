import { Category } from '../../models/category';

export interface IGetCategoriesRepository {
  getCategories(): Promise<Category[]>;
}
