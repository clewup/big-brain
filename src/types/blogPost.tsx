import { Tag } from "@/enums/tags";

export interface BlogPost {
  id: number;
  title: string;
  imageUrl: string;
  content: string;
  date: Date;
  tags: Tag[];
}
