import { beforeEach, describe, expect, it } from "vitest";
import type { PokemonCardData, PokemonStatName } from "../types/pokemon";
import {
  getFavoritePokemons,
  isFavoritePokemon,
  saveFavoritePokemons,
  toggleFavoritePokemon,
} from "./pokemonFavoritesStorage";

const FAVORITES_STORAGE_KEY = "favorite-pokemons";

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

const bulbasaur: PokemonCardData = {
  id: 1,
  name: "bulbasaur",
  image: "bulbasaur.png",
  height: 7,
  weight: 69,
  types: ["grass", "poison"],
  stats: createStats({ attack: 49 }),
};

const charmander: PokemonCardData = {
  id: 4,
  name: "charmander",
  image: "charmander.png",
  height: 6,
  weight: 85,
  types: ["fire"],
  stats: createStats({ attack: 52 }),
};

describe("pokemonFavoritesStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns an empty array when there are no stored favorites", () => {
    expect(getFavoritePokemons()).toEqual([]);
  });

  it("returns an empty array when stored favorites are invalid JSON", () => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, "invalid-json");

    expect(getFavoritePokemons()).toEqual([]);
  });

  it("saves and reads favorite pokemons", () => {
    saveFavoritePokemons([bulbasaur]);

    expect(getFavoritePokemons()).toEqual([bulbasaur]);
  });

  it("checks if a pokemon is favorite", () => {
    expect(isFavoritePokemon([bulbasaur], bulbasaur.id)).toBe(true);
    expect(isFavoritePokemon([bulbasaur], charmander.id)).toBe(false);
  });

  it("adds a pokemon when toggling a non favorite pokemon", () => {
    const result = toggleFavoritePokemon([bulbasaur], charmander);

    expect(result).toEqual([bulbasaur, charmander]);
  });

  it("removes a pokemon when toggling an existing favorite pokemon", () => {
    const result = toggleFavoritePokemon([bulbasaur, charmander], bulbasaur);

    expect(result).toEqual([charmander]);
  });
});
