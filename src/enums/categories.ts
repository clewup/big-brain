import { Color } from "./colors";

export enum Category {
  REACT = "react",
  NEXTJS = "nextjs",
  TYPESCRIPT = "typescript",
  DOTNET = "dotnet",
  HEROKU = "heroku",
}

export type Style = Record<Category, Color>;

export const CategoryStyle: Readonly<Style> = {
  [Category.DOTNET]: Color.ORANGE,
  [Category.HEROKU]: Color.PURPLE,
  [Category.NEXTJS]: Color.YELLOW,
  [Category.REACT]: Color.BLUE,
  [Category.TYPESCRIPT]: Color.GREEN,
};
