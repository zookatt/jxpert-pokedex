import { REGIONS, type RegionName } from "../constants/regions";
import type {
  Pokemon,
  PokemonListItem,
  PokemonListResponse,
  PokemonCardData,
} from "../types/pokemon";
import { mapPokemonToView } from "../utils/pokemonMap";
//acceso externo api

const pokemonRegionCache = new Map<RegionName, PokemonCardData[]>();
const POKEMON_DETAIL_CONCURRENCY = 20;

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  mapper: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];

  for (let index = 0; index < items.length; index += limit) {
    const batch = items.slice(index, index + limit);
    const batchResults = await Promise.all(batch.map(mapper));

    results.push(...batchResults);
  }

  return results;
}

async function fetchPokemonDetail({ url }: PokemonListItem): Promise<Pokemon> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not fetch pokemon detail");
  }

  return response.json();
}

export async function getPokemonsByRegion(
  region: RegionName,
): Promise<PokemonCardData[]> {
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

  const pokemons = await mapWithConcurrency(
    results,
    POKEMON_DETAIL_CONCURRENCY,
    fetchPokemonDetail,
  );

  const pokemonViews = pokemons.map(mapPokemonToView);

  pokemonRegionCache.set(region, pokemonViews);

  return pokemonViews;
}
