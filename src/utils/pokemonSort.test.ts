import { sortPokemons } from "./pokemonSort";
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
    id: 2,
    name: "ivysaur",
    image: null,
    types: [],
    stats: createStats({ attack: 62 }),
  },
  {
    id: 1,
    name: "bulbasaur",
    image: null,
    types: [],
    stats: createStats({ attack: 49 }),
  },
] as PokemonCardData[];

describe("sortPokemons", () => {
  it("sorts by id when sort is default", () => {
    const result = sortPokemons(pokemons, "default");

    expect(result.map((pokemon) => pokemon.id)).toEqual([1, 2]);
  });

  it("sorts by selected stat descending", () => {
    const result = sortPokemons(pokemons, "attack");

    expect(result.map((pokemon) => pokemon.id)).toEqual([2, 1]);
  });

  it("does not mutate the original array", () => {
    sortPokemons(pokemons, "default");

    expect(pokemons.map((pokemon) => pokemon.id)).toEqual([2, 1]);
  });

  it("sorts zero stat values lower", () => {
    const withZeroAttack = {
      ...pokemons[0],
      id: 3,
      stats: createStats(),
    } as PokemonCardData;

    const result = sortPokemons([withZeroAttack, pokemons[1]], "attack");

    expect(result.map((pokemon) => pokemon.id)).toEqual([1, 3]);
  });
});
