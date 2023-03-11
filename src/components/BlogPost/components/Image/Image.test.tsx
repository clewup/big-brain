import { render, screen } from "@testing-library/react";
import Image from "@/components/BlogPost/components/Image/Image";
import { mockBlogPost } from "@/components/BlogPost/testUtils/mockData";

describe("Image", () => {
  it("should render component in the expected state", async () => {
    render(<Image imageUrl={mockBlogPost.imageUrl} />);

    expect(await screen.findByRole("img")).toHaveAttribute(
      "src",
      "/_next/image?url=https%3A%2F%2Fplacekitten.com%2F200%2F300&w=640&q=75"
    );
  });
});
