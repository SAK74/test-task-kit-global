import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PostForm } from "../src/components/PostForm";
import type { Post } from "@/schema";
import { vi } from "vitest";

const DummyControlPanel: React.FC<{ onReset: () => void }> = () => {
  return <button type="submit">Submit</button>;
};

describe("PostForm onValid", () => {
  it("submits with id when initial post is provided", async () => {
    const initialPost: Post = {
      id: "1",
      title: "Initial Title",
      content: "Initial Content",
      comments: [],
    };
    const onSubmit = vi.fn();
    const closeWindow = vi.fn();

    render(
      <PostForm
        initial={initialPost}
        ControllPanel={DummyControlPanel}
        onSubmit={onSubmit}
        closeWindow={closeWindow}
      />
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        title: "Initial Title",
        content: "Initial Content",
        id: "1",
      });
      expect(closeWindow).toHaveBeenCalled();
    });
  });

  it("submits new data when no initial post is provided", async () => {
    const onSubmit = vi.fn();
    const closeWindow = vi.fn();

    render(
      <PostForm
        ControllPanel={DummyControlPanel}
        onSubmit={onSubmit}
        closeWindow={closeWindow}
      />
    );

    const titleInput = screen.getByPlaceholderText("Post title");
    const contentInput = screen.getByPlaceholderText("Some content");

    fireEvent.change(titleInput, { target: { value: "New Title" } });
    fireEvent.change(contentInput, { target: { value: "New Content" } });

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        title: "New Title",
        content: "New Content",
      });
      expect(closeWindow).toHaveBeenCalled();
    });
  });
});
