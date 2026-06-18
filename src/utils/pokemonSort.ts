import type { PokemonCardData, PokemonStatName } from "../types/pokemon";
//logica-sort
export type SortOption = "default" | PokemonStatName;

export function sortPokemons(
  pokemons: PokemonCardData[],
  sort: SortOption,
): PokemonCardData[] {
  return [...pokemons].sort((a, b) => {
    if (sort === "default") return a.id - b.id;

    const aStat = a.stats[sort];
    const bStat = b.stats[sort];

    return bStat - aStat;
  });
}
