import { Home } from "@/pages/Home";
import { store } from "@/store";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

describe("", () => {
  it("SHould be true", () => {
    expect(true).toBeTruthy();
  });

  it("with testing-library", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    const posts = screen.getByRole("heading", {
      level: 1,
    });
    expect(posts).toBeInTheDocument();
  });
});
