import { render, screen } from "@testing-library/react";
import Title from "@/components/molecules/BlogPost/components/Title/Title";
import { mockBlogPost } from "@/components/molecules/BlogPost/testUtils/mockData";

describe("BlogPost.Title", () => {
  it("should render the title", async () => {
    render(<Title _id={mockBlogPost._id} title={mockBlogPost.title} />);

    expect(await screen.findByText(/^mock blog post/i)).toBeInTheDocument();
  });
});
