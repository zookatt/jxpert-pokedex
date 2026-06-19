import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useFavoritePokemons } from "./useFavoritePokemons";
import type { PokemonCardData, PokemonStatName } from "../types/pokemon";

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
  types: ["grass", "poison"],
  stats: createStats({ attack: 49 }),
};

const charmander: PokemonCardData = {
  id: 4,
  name: "charmander",
  image: "charmander.png",
  types: ["fire"],
  stats: createStats({ attack: 52 }),
};

describe("useFavoritePokemons", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("loads initial favorite pokemons from localStorage", () => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([bulbasaur]));

    const { result } = renderHook(() => useFavoritePokemons());

    expect(result.current.favoritePokemons).toEqual([bulbasaur]);
  });

  it("adds a pokemon to favorites", () => {
    const { result } = renderHook(() => useFavoritePokemons());

    act(() => {
      result.current.toggleFavorite(bulbasaur);
    });

    expect(result.current.favoritePokemons).toEqual([bulbasaur]);
    expect(JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) ?? "[]")).toEqual([
      bulbasaur,
    ]);
  });

  it("removes a pokemon when it is already favorite", () => {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify([bulbasaur, charmander]),
    );
    const { result } = renderHook(() => useFavoritePokemons());

    act(() => {
      result.current.toggleFavorite(bulbasaur);
    });

    expect(result.current.favoritePokemons).toEqual([charmander]);
    expect(JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) ?? "[]")).toEqual([
      charmander,
    ]);
  });

  it("checks if a pokemon is favorite", () => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([bulbasaur]));

    const { result } = renderHook(() => useFavoritePokemons());

    expect(result.current.isFavorite(bulbasaur.id)).toBe(true);
    expect(result.current.isFavorite(charmander.id)).toBe(false);
  });
});
