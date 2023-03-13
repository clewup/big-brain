import { Tag } from "@/enums/tags";

export interface BlogPost {
  id: number;
  title: string;
  imageUrl: string;
  content: string;
  date: string;
  tags: Tag[];
}
