import type { Pokemon } from "../types/pokemon";
//logica-filtrar
export function filterPokemons(pokemons: Pokemon[], search: string): Pokemon[] {
  const query = search.toLowerCase().trim();

  return pokemons.filter(
    (pokemon) =>
      pokemon.name.includes(query) ||
      pokemon.types.some(({ type }) => type.name.startsWith(query)),
  );
}
