import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PokemonGrid } from "./PokemonGrid";
import type { PokemonCardData } from "../../types/pokemon";
const pokemons = [
  {
    id: 25,
    name: "pikachu",
    image: "pikachu.png",
    height: 4,
    weight: 60,
    types: ["electric"],
    stats: {
      hp: 35,
      attack: 55,
      defense: 40,
      "special-attack": 50,
      "special-defense": 50,
      speed: 90,
    },
  },
] as PokemonCardData[];

const defaultProps = {
  isFavoritePokemon: () => false,
  onToggleFavorite: vi.fn(),
};

describe("PokemonGrid", () => {
  it("renders loading placeholders when loading", () => {
    const { container } = render(
      <PokemonGrid pokemons={[]} isLoading {...defaultProps} />,
    );

    expect(container.querySelectorAll(".card-placeholder")).toHaveLength(6);
  });
  it("renders nothing when there are no pokemons", () => {
    const { container } = render(
      <PokemonGrid pokemons={[]} isLoading={false} {...defaultProps} />,
    );

    expect(container.querySelector(".grid")).not.toBeInTheDocument();
  });
  it("renders pokemon cards", () => {
    render(
      <PokemonGrid pokemons={pokemons} isLoading={false} {...defaultProps} />,
    );

    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.getByAltText("pikachu artwork")).toBeInTheDocument();
  });

  it("toggles pokemon favorite from card", async () => {
    const user = userEvent.setup();
    const onToggleFavorite = vi.fn();

    render(
      <PokemonGrid
        pokemons={pokemons}
        isLoading={false}
        isFavoritePokemon={() => false}
        onToggleFavorite={onToggleFavorite}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Add to favorites" }));

    expect(onToggleFavorite).toHaveBeenCalledWith(pokemons[0]);
  });
});
