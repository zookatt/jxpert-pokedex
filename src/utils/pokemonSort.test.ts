import { sortPokemons } from "./pokemonSort";
import type { Pokemon } from "../types/pokemon";
import { describe, expect, it } from "vitest";

const pokemons = [
  {
    id: 2,
    name: "ivysaur",
    types: [],
    stats: [{ base_stat: 62, stat: { name: "attack" } }],
    sprites: { other: { "official-artwork": { front_default: null } } },
  },
  {
    id: 1,
    name: "bulbasaur",
    types: [],
    stats: [{ base_stat: 49, stat: { name: "attack" } }],
    sprites: { other: { "official-artwork": { front_default: null } } },
  },
] as Pokemon[];

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

  it("uses 0 when a pokemon does not have the selected stat", () => {
    const withoutAttack = {
      ...pokemons[0],
      id: 3,
      stats: [],
    } as Pokemon;

    const result = sortPokemons([withoutAttack, pokemons[1]], "attack");

    expect(result.map((pokemon) => pokemon.id)).toEqual([1, 3]);
  });
});
