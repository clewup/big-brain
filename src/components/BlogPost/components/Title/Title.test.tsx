import { render, screen } from "@testing-library/react";
import Title from "@/components/BlogPost/components/Title/Title";
import { mockBlogPost } from "@/components/BlogPost/testUtils/mockData";

describe("BlogPost.Title", () => {
  it("should render the title", async () => {
    render(<Title title={mockBlogPost.title} />);

    expect(await screen.findByText(/^mock blog post/i)).toBeInTheDocument();
  });
});
