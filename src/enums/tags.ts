export enum Tag {
  REACT = "react",
  NEXTJS = "nextjs",
  TYPESCRIPT = "typescript",
  DOTNET = "dotnet",
  HEROKU = "heroku",
}

export enum TagColor {
  RED = "#ff006e",
  BLUE = "#3a86ff",
  ORANGE = "#fb5607",
  GREEN = "#80ed99",
  PURPLE = "#8338ec",
  YELLOW = "#ffbe0b",
}

export type TagStyle = Record<Tag, TagColor>;

export const TagStyles: TagStyle = {
  [Tag.DOTNET]: TagColor.ORANGE,
  [Tag.HEROKU]: TagColor.PURPLE,
  [Tag.NEXTJS]: TagColor.YELLOW,
  [Tag.REACT]: TagColor.BLUE,
  [Tag.TYPESCRIPT]: TagColor.GREEN,
};
