import { useMemo } from "react";
import { filterPokemons } from "../utils/pokemonFilter";
import { sortPokemons, type SortOption } from "../utils/pokemonSort";
import type { PokemonCardData } from "../types/pokemon";

export function useVisiblePokemons(
  pokemons: PokemonCardData[],
  search: string,
  sort: SortOption,
): PokemonCardData[] {
  return useMemo(() => {
    const filteredPokemons = filterPokemons(pokemons, search);

    return sortPokemons(filteredPokemons, sort);
  }, [pokemons, search, sort]);
}
