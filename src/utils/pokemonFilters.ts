import type { Pokemon } from "../types/pokemon";

export function filterPokemons(pokemons: Pokemon[], search: string) {
  const query = search.toLowerCase().trim();

  return pokemons.filter(
    (pokemon) =>
      pokemon.name.includes(query) ||
      pokemon.types.some(({ type }) => type.name.startsWith(query)),
  );
}
