import { filterPokemons } from "./pokemonFilter";
import type { PokemonCardData, PokemonStatName } from "../types/pokemon";
import { describe, expect, it } from "vitest";

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
    types: ["grass", "poison"],
    stats: createStats(),
  },
  {
    id: 4,
    name: "charmander",
    image: null,
    types: ["fire"],
    stats: createStats(),
  },
] as PokemonCardData[];

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
