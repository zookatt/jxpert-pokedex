import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PokemonGrid } from "./PokemonGrid";
import type { Pokemon } from "../../types/pokemon";
const pokemons = [
  {
    id: 25,
    name: "pikachu",
    types: [{ type: { name: "electric" } }],
    stats: [
      { base_stat: 35, stat: { name: "hp" } },
      { base_stat: 55, stat: { name: "attack" } },
      { base_stat: 40, stat: { name: "defense" } },
      { base_stat: 50, stat: { name: "special-attack" } },
      { base_stat: 50, stat: { name: "special-defense" } },
      { base_stat: 90, stat: { name: "speed" } },
    ],
    sprites: {
      other: {
        "official-artwork": {
          front_default: "pikachu.png",
        },
      },
    },
  },
] as Pokemon[];

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
