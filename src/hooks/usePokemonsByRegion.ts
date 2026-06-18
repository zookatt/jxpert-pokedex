import { useEffect, useState } from "react";
import { getPokemonsByRegion } from "../services/pokemonApi";
import type { RegionName } from "../constants/regions";
import type { Pokemon } from "../types/pokemon";

export function usePokemonsByRegion(region: RegionName) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadPokemons() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getPokemonsByRegion(region);

        if (!ignore) {
          setPokemons(data);
        }
      } catch {
        if (!ignore) {
          setError("Could not load pokemons");
          setPokemons([]);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadPokemons();

    return () => {
      ignore = true;
    };
  }, [region]);

  return { pokemons, isLoading, error };
}
