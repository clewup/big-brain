import { Category } from "@/enums/categories";

export interface BlogPost {
  _id: string;
  title: string;
  image: string;
  content: string;
  date: Date;
  tags: Category[];
}

export type Positioning = [number, number] & { length: 2 };
