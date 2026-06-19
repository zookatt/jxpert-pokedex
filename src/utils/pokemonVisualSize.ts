import type { PokemonCardData } from "../types/pokemon";

export function getPokemonVisualSize(pokemon: PokemonCardData): number {
  const heightFactor = pokemon.height / 10;
  const weightFactor = Math.sqrt(pokemon.weight / 100);

  const rawSize = 110 + heightFactor * 25 + weightFactor * 20;

  return Math.min(Math.max(rawSize, 90), 260);
}