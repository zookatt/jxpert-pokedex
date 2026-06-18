import { REGIONS, type RegionName } from "../constants/regions";
import type { Pokemon, PokemonListResponse } from "../types/pokemon";
//acceso externo api
export async function getPokemonsByRegion(
  region: RegionName,
): Promise<Pokemon[]> {
  const { offset, limit } = REGIONS[region];

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
  );

  if (!response.ok) {
  throw new Error("Could not fetch pokemon list");
}
  const { results }: PokemonListResponse = await response.json();

  return Promise.all(
  results.map(async ({ url }) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Could not fetch pokemon detail");
    }

    return response.json();
  }),
);
}
