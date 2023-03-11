import { render, screen } from "@testing-library/react";
import Details from "@/components/BlogPost/components/Details/Details";
import { mockBlogPost } from "@/components/BlogPost/testUtils/mockData";

describe("Details", () => {
  it("should render the component in the expected state", async () => {
    render(<Details content={mockBlogPost.content} date={mockBlogPost.date} />);

    expect(await screen.findByText(/^lorem ipsum/i)).toBeInTheDocument();
    expect(
      await screen.findByText(new Date().toDateString())
    ).toBeInTheDocument();
  });

  it("should render the content to 300 characters if more than 300", async () => {
    render(<Details content={mockBlogPost.content} date={mockBlogPost.date} />);

    const content = await screen.findByText(/^lorem ipsum/i);
    // 303 including '...'
    expect(content.textContent?.length).toBe(303);
    expect(content).toHaveTextContent("...");
  });

  it("should render the content to the content length if less than 300", async () => {
    render(<Details content={"Mock Content"} date={mockBlogPost.date} />);

    const content = await screen.findByText(/^mock content/i);
    expect(content.textContent?.length).toBe(12);
    expect(content).not.toHaveTextContent("...");
  });
});
