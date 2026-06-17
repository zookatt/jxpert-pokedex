import type { Pokemon, PokemonStatName } from "../types/pokemon";
//logica-sort
export type SortOption = "default" | PokemonStatName;

export function sortPokemons(pokemons: Pokemon[], sort: SortOption): Pokemon[] {
  return [...pokemons].sort((a, b) => {
    if (sort === "default") return a.id - b.id;

    const aStat =
      a.stats.find(({ stat }) => stat.name === sort)?.base_stat ?? 0;
    const bStat =
      b.stats.find(({ stat }) => stat.name === sort)?.base_stat ?? 0;

    return bStat - aStat;
  });
}
