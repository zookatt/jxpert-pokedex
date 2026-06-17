import { LoadingPokemonCard } from "../molecules/LoadingPokemonCard";
import { PokemonCard } from "../molecules/PokemonCard";
import type { Pokemon } from "../../types/pokemon";

interface PokemonGridProps {
  pokemons: Pokemon[];
  isLoading: boolean;
}

export function PokemonGrid({ pokemons, isLoading }: PokemonGridProps) {
  if (isLoading) {
    return (
      <div className="grid" aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => (
          <LoadingPokemonCard key={`placeholder-card-${index}`} />
        ))}
      </div>
    );
  }

  if (pokemons.length === 0) {
    return null;
  }

  return (
    <ul className="grid">
      {pokemons.map((pokemon) => (
        <PokemonCard key={`pokemon-card-${pokemon.id}`} pokemon={pokemon} />
      ))}
    </ul>
  );
}
