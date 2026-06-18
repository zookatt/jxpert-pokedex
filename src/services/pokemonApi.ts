import { REGIONS, type RegionName } from "../constants/regions";
import type { Pokemon, PokemonListResponse } from "../types/pokemon";
//acceso externo api

const pokemonRegionCache = new Map<RegionName, Pokemon[]>();

export async function getPokemonsByRegion(
  region: RegionName,
): Promise<Pokemon[]> {
  const cachedPokemons = pokemonRegionCache.get(region);

  if (cachedPokemons) {
    return cachedPokemons;
  }
  const { offset, limit } = REGIONS[region];

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error("Could not fetch pokemon list");
  }
  const { results }: PokemonListResponse = await response.json();

  const pokemons = await Promise.all(
    results.map(async ({ url }) => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Could not fetch pokemon detail");
      }

      return response.json();
    }),
  );

  pokemonRegionCache.set(region, pokemons);

  return pokemons;
}
