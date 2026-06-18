import { filterPokemons } from "./pokemonFilter";
import type { Pokemon } from "../types/pokemon";
import { describe, expect, it } from "vitest";

const pokemons = [
  {
    id: 1,
    name: "bulbasaur",
    types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
    stats: [],
    sprites: { other: { "official-artwork": { front_default: null } } },
  },
  {
    id: 4,
    name: "charmander",
    types: [{ type: { name: "fire" } }],
    stats: [],
    sprites: { other: { "official-artwork": { front_default: null } } },
  },
] as Pokemon[];

describe("filterPokemons", () => {
  it("filters by pokemon name", () => {
    expect(filterPokemons(pokemons, "bulba")).toEqual([pokemons[0]]);
  });

  it("filters by pokemon type", () => {
    expect(filterPokemons(pokemons, "fire")).toEqual([pokemons[1]]);
  });

  it("trims and lowercases the search", () => {
    expect(filterPokemons(pokemons, "  FIRE  ")).toEqual([pokemons[1]]);
  });

  it("returns all pokemons when search is empty", () => {
    expect(filterPokemons(pokemons, "")).toEqual(pokemons);
  });

  it("returns an empty array when there are no matches", () => {
    expect(filterPokemons(pokemons, "water")).toEqual([]);
  });
});
