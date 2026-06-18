import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PokemonGrid } from "./PokemonGrid";
import type { PokemonCardData } from "../../types/pokemon";
const pokemons = [
  {
    id: 25,
    name: "pikachu",
    image: "pikachu.png",
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

describe("PokemonGrid", () => {
  it("renders loading placeholders when loading", () => {
    const { container } = render(<PokemonGrid pokemons={[]} isLoading />);

    expect(container.querySelectorAll(".card-placeholder")).toHaveLength(6);
  });
  it("renders nothing when there are no pokemons", () => {
    const { container } = render(
      <PokemonGrid pokemons={[]} isLoading={false} />,
    );

    expect(container.querySelector(".grid")).not.toBeInTheDocument();
  });
  it("renders pokemon cards", () => {
    render(<PokemonGrid pokemons={pokemons} isLoading={false} />);

    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.getByAltText("pikachu artwork")).toBeInTheDocument();
  });
});
