import type { PokemonCardData } from "../types/pokemon";
//logica-filtrar
export function filterPokemons(
  pokemons: PokemonCardData[],
  search: string,
): PokemonCardData[] {
  const query = search.toLowerCase().trim();

  return pokemons.filter(
    (pokemon) =>
      pokemon.name.includes(query) ||
      pokemon.types.some((type) => type.startsWith(query)),
  );
}
