import type { PokemonCardData } from "../types/pokemon";

export function getPokemonVisualSize(pokemon: PokemonCardData): number {
  const heightFactor = pokemon.height / 10;
  const weightFactor = Math.sqrt(pokemon.weight / 100);

  const rawSize = 100 + heightFactor * 22 + weightFactor * 16;

  return Math.min(Math.max(rawSize, 85), 230);
}
