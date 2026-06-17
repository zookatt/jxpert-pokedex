import { useMemo } from "react";
import { filterPokemons } from "../utils/pokemonFilters";
import { sortPokemons, type SortOption } from "../utils/pokemonSort";
import type { Pokemon } from "../types/pokemon";

export function useVisiblePokemons(
  pokemons: Pokemon[],
  search: string,
  sort: SortOption,
): Pokemon[] {
  return useMemo(() => {
    const filteredPokemons = filterPokemons(pokemons, search);

    return sortPokemons(filteredPokemons, sort);
  }, [pokemons, search, sort]);
}