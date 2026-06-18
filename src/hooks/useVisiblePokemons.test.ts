import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useVisiblePokemons } from "./useVisiblePokemons";
import type { Pokemon } from "../types/pokemon";
import type { SortOption } from "../utils/pokemonSort";

const pokemons = [
  {
    id: 1,
    name: "bulbasaur",
    types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
    stats: [{ base_stat: 49, stat: { name: "attack" } }],
    sprites: { other: { "official-artwork": { front_default: null } } },
  },
  {
    id: 2,
    name: "ivysaur",
    types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
    stats: [{ base_stat: 62, stat: { name: "attack" } }],
    sprites: { other: { "official-artwork": { front_default: null } } },
  },
  {
    id: 4,
    name: "charmander",
    types: [{ type: { name: "fire" } }],
    stats: [{ base_stat: 52, stat: { name: "attack" } }],
    sprites: { other: { "official-artwork": { front_default: null } } },
  },
] as Pokemon[];

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
