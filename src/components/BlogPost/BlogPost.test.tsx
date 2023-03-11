import { render, screen } from "@testing-library/react";
import BlogPost from "@/components/BlogPost/BlogPost";
import { mockBlogPost } from "@/components/BlogPost/testUtils/mockData";

describe("BlogPost", () => {
  it("should render the component in the expected state", async () => {
    render(<BlogPost blogPost={mockBlogPost} />);

    expect(await screen.findByText(/^mock blog post/i)).toBeInTheDocument();
    expect(await screen.findByRole("img")).toHaveAttribute(
      "src",
      "/_next/image?url=https%3A%2F%2Fplacekitten.com%2F200%2F300&w=640&q=75"
    );
    expect(await screen.findByText(/^lorem ipsum/i)).toBeInTheDocument();
    expect(
      await screen.findByText(new Date().toDateString())
    ).toBeInTheDocument();
  });
});
