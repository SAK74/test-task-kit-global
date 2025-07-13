import { render, screen } from "@testing-library/react";
import { type Mock } from "vitest";
import { useTypedSelector } from "@/store";
import type { Post } from "@/schema";
import { PostsView } from "@/components/PostsView";

vi.mock("@/store", () => {
  return {
    useTypedSelector: vi.fn(),
  };
});

vi.mock("@/store/posts.slice", () => ({
  selectAllPosts: "selectAllPosts",
}));

vi.mock("@/components/SortProvider", () => {
  return {
    useSortCtx: () => ({
      sortBy: "title",
      sortDir: "asc",
    }),
  };
});

vi.mock("@/components/FilterProvider", () => {
  return {
    useFilterCtx: () => ({
      filterByAuthor: false,
      authorValue: "",
      filterByContent: false,
      contentValue: "",
    }),
  };
});

vi.mock("@/components/Post", () => {
  return {
    SinglePost: ({ post }: { post: Post }) => (
      <div data-testid="post">{post.title}</div>
    ),
  };
});

vi.mock("@/components/Spinner", () => {
  return {
    Spinner: () => <div data-testid="spinner">Loading...</div>,
  };
});

describe("PostsView", () => {
  beforeEach(() => {
    (useTypedSelector as unknown as Mock).mockReset();
  });

  it("renders spinner when status is pending", () => {
    (useTypedSelector as unknown as Mock).mockImplementation(
      (selector: unknown) => {
        if (selector === "selectAllPosts") {
          return [];
        }
        return { status: "pending", error: null };
      }
    );

    render(<PostsView />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders error message when error exists", () => {
    const errorMsg = "An error occurred";
    (useTypedSelector as unknown as Mock).mockImplementation(
      (selector: unknown) => {
        if (selector === "selectAllPosts") {
          return [];
        }
        return { status: "idle", error: errorMsg };
      }
    );

    render(<PostsView />);
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });

  it("renders posts sorted by title in ascending order", () => {
    const posts = [
      {
        id: "2",
        title: "B Post",
        content: "Content B",
        timestamp: 2,
        author: "Author B",
      },
      {
        id: "1",
        title: "A Post",
        content: "Content A",
        timestamp: 1,
        author: "Author A",
      },
    ];
    (useTypedSelector as unknown as Mock).mockImplementation(
      (selector: unknown) => {
        if (selector === "selectAllPosts") {
          return posts;
        }
        return { status: "idle", error: null };
      }
    );

    render(<PostsView />);
    const renderedPosts = screen.getAllByTestId("post");
    expect(renderedPosts[0].textContent).toBe("A Post");
    expect(renderedPosts[1].textContent).toBe("B Post");
  });
});
