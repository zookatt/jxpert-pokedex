import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FavoriteButton } from "./FavoriteButton";

describe("FavoriteButton", () => {
  it("renders add to favorites state when pokemon is not favorite", () => {
    render(<FavoriteButton isFavorite={false} onClick={vi.fn()} />);

    const button = screen.getByRole("button", { name: "Add to favorites" });

    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("renders remove from favorites state when pokemon is favorite", () => {
    render(<FavoriteButton isFavorite onClick={vi.fn()} />);

    const button = screen.getByRole("button", {
      name: "Remove from favorites",
    });

    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onClick when pressed", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<FavoriteButton isFavorite={false} onClick={handleClick} />);

    await user.click(screen.getByRole("button", { name: "Add to favorites" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
