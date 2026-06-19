import { describe, expect, it } from "vitest";
import { mapPokemonToView } from "./pokemonMap";
import type { Pokemon, PokemonCardData } from "../types/pokemon";

const pokemon = {
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
} satisfies Pokemon;

const pokemonCardData: PokemonCardData = {
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
};

describe("mapPokemonToView", () => {
  it("maps pokeapi pokemon data to card data", () => {
    const result = mapPokemonToView(pokemon);

    expect(result).toEqual(pokemonCardData);
  });

  it("uses 0 for missing stats", () => {
    const pokemonWithoutStats = {
      ...pokemon,
      stats: [],
    } as Pokemon;

    const result = mapPokemonToView(pokemonWithoutStats);

    expect(result.stats).toEqual({
      hp: 0,
      attack: 0,
      defense: 0,
      "special-attack": 0,
      "special-defense": 0,
      speed: 0,
    });
  });

  it("keeps null image when artwork is missing", () => {
    const pokemonWithoutImage = {
      ...pokemon,
      sprites: {
        other: {
          "official-artwork": {
            front_default: null,
          },
        },
      },
    } as Pokemon;

    const result = mapPokemonToView(pokemonWithoutImage);

    expect(result.image).toBeNull();
  });
});
