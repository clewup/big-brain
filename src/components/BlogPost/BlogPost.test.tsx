import { render, screen } from "@testing-library/react";
import BlogPost from "@/components/BlogPost/BlogPost";
import { mockBlogPost } from "@/components/BlogPost/testUtils/mockData";

describe("BlogPost", () => {
  it("should render the title component", async () => {
    render(<BlogPost blogPost={mockBlogPost} />);

    expect(await screen.findByTestId("blog_post_title")).toBeInTheDocument();
  });

  it("should render the image component", async () => {
    render(<BlogPost blogPost={mockBlogPost} />);

    expect(await screen.findByTestId("blog_post_image")).toBeInTheDocument();
  });

  it("should render the details component", async () => {
    render(<BlogPost blogPost={mockBlogPost} />);

    expect(await screen.findByTestId("blog_post_details")).toBeInTheDocument();
  });

  it("should render the tags component", async () => {
    render(<BlogPost blogPost={mockBlogPost} />);

    expect(await screen.findByTestId("blog_post_tags")).toBeInTheDocument();
  });
});
