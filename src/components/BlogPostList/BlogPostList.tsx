import styles from "./BlogPostList.module.scss";
import BlogPost from "@/components/BlogPost/BlogPost";
import { mockBlogPosts } from "@/components/BlogPost/testUtils/mockData";

const BlogPostList = () => {
  return (
    <div className={styles.blog_post_list}>
      {mockBlogPosts.map((blogPost) => {
        return <BlogPost blogPost={blogPost} />;
      })}
    </div>
  );
};
export default BlogPostList;
