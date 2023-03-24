import { ColorsEnum } from '@/enums/colorsEnum';
import { CategoryStyleType } from '@/types';

export enum CategoriesEnum {
    REACT = 'react',
    NEXTJS = 'nextjs',
    TYPESCRIPT = 'typescript',
    DOTNET = 'dotnet',
    HEROKU = 'heroku',
}

export const CategoryStylesEnum: Readonly<CategoryStyleType> = {
    [CategoriesEnum.DOTNET]: ColorsEnum.ORANGE,
    [CategoriesEnum.HEROKU]: ColorsEnum.PURPLE,
    [CategoriesEnum.NEXTJS]: ColorsEnum.YELLOW,
    [CategoriesEnum.REACT]: ColorsEnum.BLUE,
    [CategoriesEnum.TYPESCRIPT]: ColorsEnum.GREEN,
};
