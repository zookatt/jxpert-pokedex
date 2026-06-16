import { REGIONS, type RegionName } from "../constants/regions";
import type { Pokemon } from "../types/pokemon";

export async function getPokemonsByRegion(region: RegionName): Promise<Pokemon[]> {
  const { offset, limit } = REGIONS[region];

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
  );

  const { results } = await response.json();

  return Promise.all(
    results.map(({ url }: { url: string }) =>
      fetch(url).then((res) => res.json()),
    ),
  );
}