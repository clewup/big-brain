import { render, screen } from "@testing-library/react";
import BlogPostList from "@/components/BlogPostList/BlogPostList";
import { mockBlogPosts } from "@/components/BlogPost/testUtils/mockData";

describe("BlogPostList", () => {
  it("should render a list of blog posts", async () => {
    render(<BlogPostList blogPosts={mockBlogPosts} />);

    expect(await screen.findAllByTestId(/blogpost /)).toHaveLength(6);
  });
});
