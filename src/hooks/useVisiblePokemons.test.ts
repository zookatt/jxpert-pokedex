import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useVisiblePokemons } from "./useVisiblePokemons";
import type { PokemonCardData, PokemonStatName } from "../types/pokemon";
import type { SortOption } from "../utils/pokemonSort";

const createStats = (
  overrides: Partial<Record<PokemonStatName, number>> = {},
): Record<PokemonStatName, number> => ({
  hp: 0,
  attack: 0,
  defense: 0,
  "special-attack": 0,
  "special-defense": 0,
  speed: 0,
  ...overrides,
});

const pokemons = [
  {
    id: 1,
    name: "bulbasaur",
    image: null,
    height: 7,
    weight: 69,
    types: ["grass", "poison"],
    stats: createStats({ attack: 49 }),
  },
  {
    id: 2,
    name: "ivysaur",
    image: null,
    height: 10,
    weight: 130,
    types: ["grass", "poison"],
    stats: createStats({ attack: 62 }),
  },
  {
    id: 4,
    name: "charmander",
    image: null,
    height: 6,
    weight: 85,
    types: ["fire"],
    stats: createStats({ attack: 52 }),
  },
] as PokemonCardData[];

describe("useVisiblePokemons", () => {
  it("filters pokemons and sorts the visible results", () => {
    const { result } = renderHook(() =>
      useVisiblePokemons(pokemons, "grass", "attack"),
    );

    expect(result.current.map((pokemon) => pokemon.name)).toEqual([
      "ivysaur",
      "bulbasaur",
    ]);
  });

  it("updates visible pokemons when search and sort change", () => {
    const { result, rerender } = renderHook(
      ({ search, sort }: { search: string; sort: SortOption }) =>
        useVisiblePokemons(pokemons, search, sort),
      { initialProps: { search: "", sort: "default" as SortOption } },
    );

    expect(result.current.map((pokemon) => pokemon.id)).toEqual([1, 2, 4]);

    rerender({ search: "fire", sort: "attack" });

    expect(result.current.map((pokemon) => pokemon.name)).toEqual([
      "charmander",
    ]);
  });
});
