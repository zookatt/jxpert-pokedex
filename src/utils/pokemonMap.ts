import type {
  Pokemon,
  PokemonCardData,
  PokemonStatName,
} from "../types/pokemon";

const DEFAULT_STATS: Record<PokemonStatName, number> = {
  hp: 0,
  attack: 0,
  defense: 0,
  "special-attack": 0,
  "special-defense": 0,
  speed: 0,
};

export function mapPokemonToView(pokemon: Pokemon): PokemonCardData {
  const stats = { ...DEFAULT_STATS };

  pokemon.stats.forEach(({ base_stat, stat }) => {
    stats[stat.name] = base_stat;
  });

  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other["official-artwork"].front_default,
    height: pokemon.height,
    weight: pokemon.weight,
    types: pokemon.types.map(({ type }) => type.name),
    stats,
  };
}
