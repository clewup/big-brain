import { CategoriesEnum } from '@/enums';
import { ColorType } from '@/types';

export type CategoryType = CategoriesEnum;
export type CategoryStyleType = Record<CategoryType, ColorType>;
