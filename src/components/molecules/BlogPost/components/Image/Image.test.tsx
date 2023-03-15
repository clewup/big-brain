import { render, screen } from "@testing-library/react";
import Image from "@/components/molecules/BlogPost/components/Image/Image";
import { mockBlogPost } from "@/components/molecules/BlogPost/testUtils/mockData";

describe("BlogPost.Image", () => {
  it("should render the image", async () => {
    render(<Image imageUrl={mockBlogPost.imageUrl} />);

    expect(await screen.findByRole("img")).toHaveAttribute(
      "src",
      "/_next/image?url=https%3A%2F%2Fapi.lorem.space%2Fimage%2Fpizza%3Fw%3D150%26h%3D150&w=640&q=75"
    );
  });
});
