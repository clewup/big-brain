import { render, screen } from "@testing-library/react";
import Tags from "@/components/molecules/BlogPost/components/Tags/Tags";
import { Category, CategoryStyle } from "@/enums/categories";
import { mockBlogPost } from "@/components/molecules/BlogPost/testUtils/mockData";

describe("BlogPost.Tags", () => {
  it("should render each tag", async () => {
    render(<Tags tags={mockBlogPost.tags} />);

    expect(await screen.findByText(/nextjs/)).toBeInTheDocument();
    expect(await screen.findByText(/typescript/)).toBeInTheDocument();
  });

  it("should prefix each tag with a #", async () => {
    render(<Tags tags={mockBlogPost.tags} />);

    expect(await screen.findByText(/#nextjs/)).toBeInTheDocument();
    expect(await screen.findByText(/#typescript/)).toBeInTheDocument();
  });

  it("should style each tag with the mapped color", async () => {
    render(<Tags tags={mockBlogPost.tags} />);

    const nextJsColor = CategoryStyle[Category.NEXTJS];
    const typescriptColor = CategoryStyle[Category.TYPESCRIPT];

    expect(await screen.findByText(/#nextjs/)).toHaveStyle(
      `color: ${nextJsColor}`
    );
    expect(await screen.findByText(/#typescript/)).toHaveStyle(
      `color: ${typescriptColor}`
    );
  });
});
