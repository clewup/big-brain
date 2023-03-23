import { Tag } from "@/enums/tags";

export interface BlogPost {
  _id: string;
  title: string;
  image: string;
  content: string;
  date: Date;
  tags: Tag[];

  titlePos: Positioning;
  imagePos: Positioning;
  contentPos: Positioning;
  tagsPos: Positioning;
}

export type Positioning = [number, number] & { length: 2 };
