import { render, screen } from "@testing-library/react";
import Tags from "@/components/molecules/BlogPost/components/Tags/Tags";
import { Tag } from "@/enums/tags";
import { mockBlogPost } from "@/components/molecules/BlogPost/testUtils/mockData";
import { TagStyles } from "@/enums/tags";

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

    const nextJsColor = TagStyles[Tag.NEXTJS];
    const typescriptColor = TagStyles[Tag.TYPESCRIPT];

    expect(await screen.findByText(/#nextjs/)).toHaveStyle(
      `color: ${nextJsColor}`
    );
    expect(await screen.findByText(/#typescript/)).toHaveStyle(
      `color: ${typescriptColor}`
    );
  });
});
